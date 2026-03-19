/**
 * Scans a vCloud Director External Network to determine the status of all IP addresses.
 * Categorizes IPs as FREE, VSE (allocated to Edge), or SUB (sub-allocated).
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:ExternalNetwork} net The External Network to scan.
 * @param {string} site Site identifier string.
 * @param {boolean} needDetails If true, retrieves additional organization and edge details.
 * @returns {Properties[]} Array of properties objects describing each IP status.
 */

var vcd = System.getModule("org.telus.vCloud").getvCloudHost();
var start = System.getCurrentTime();
System.debug("Scanning for external IP Status in external network " + net.name);

vcd.updateInternalState();
var ipStatus = new Properties();
var ipMap = new Array();
var edgeMap = new Properties();

var config = net.configuration;
var ipScopes = config.ipScopes;
var ipScopeList = ipScopes.ipScope;

for each (var ipScope in ipScopeList.enumerate()) {
    System.debug("  Processing IPScope");
    var ipRanges = ipScope.ipRanges;
    var ipRangeList = ipRanges.ipRange;
    
    for each (var range in ipRangeList.enumerate()) {
        System.debug("    Range: " + range.startAddress + " - " + range.endAddress);
        var first = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(range.startAddress);
        var last = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(range.endAddress);
        
        for (var ip = first; ip <= last; ip++) {
            var ipStr = System.getModule("com.telus.agilit.vcd.util").ipIntToStr(ip);
            var ipEntry = new Properties();
            ipEntry.put('ip', ipStr);
            ipEntry.put('org', '');
            ipEntry.put('network', '');
            ipEntry.put('edge', '');
            ipEntry.put('site', site);
            
            // Workaround for specific buggy IPs that are reported free but are active
            var problematicIps = ['207.34.239.35', '207.34.239.39', '207.34.239.86', '207.34.239.87', '207.34.239.88', '207.34.239.237', '207.34.239.238', '207.34.239.239'];
            if (problematicIps.indexOf(ipStr) != -1) {
                ipEntry.put('type', "VSE");    
            } else {
                ipEntry.put('type', "FREE");
            }
            
            ipStatus.put(ipStr, ipEntry);
        }
    }
    
    var addresses = ipScope.allocatedIpAddresses.ipAddress;
    System.debug("Processing Allocated Addresses");
    for each (var addr in addresses.enumerate()) {
        System.debug("  VSE Allocated: " + addr);
        var ipEntryVse = new Properties();
        ipEntryVse.put('ip', addr);
        ipEntryVse.put('org', 'Unknown');
        ipEntryVse.put('network', 'Unknown');
        ipEntryVse.put('edge', 'Unknown');
        ipEntryVse.put('type', "VSE");
        ipEntryVse.put('site', site);
        ipStatus.put(addr, ipEntryVse);
    }
    
    var allocs = ipScope.subAllocations.subAllocation;
    System.debug("Processing Sub-Allocations");
    for each (var alloc in allocs.enumerate()) {
        var edgeName = alloc.edgeGateway.name;
        var orgName = 'Unknown';
        if (needDetails) {
            var edge = edgeMap.get(alloc.edgeGateway.href);
            if (!edge) {
                edge = vcd.getEntityByReference(VclFinderType.GATEWAY, alloc.edgeGateway);
                edgeMap.put(alloc.edgeGateway.href, edge);
            }
            if (edge && edge.parent) {
                var org = edge.parent.parent;
                orgName = org.name;
            }
        }
        
        var subIpRanges = alloc.ipRanges;
        var subIpRangeList = subIpRanges.ipRange;
        for each (var subRange in subIpRangeList.enumerate()) {
            System.debug(edgeName + " Range: " + subRange.startAddress + " - " + subRange.endAddress);
            var subFirst = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(subRange.startAddress);
            var subLast = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(subRange.endAddress);
            
            for (var subIp = subFirst; subIp <= subLast; subIp++) {
                var subIpStr = System.getModule("com.telus.agilit.vcd.util").ipIntToStr(subIp);
                var subIpEntry = new Properties();
                subIpEntry.put('ip', subIpStr);
                subIpEntry.put('org', orgName);
                subIpEntry.put('network', '???');
                subIpEntry.put('edge', edgeName);
                subIpEntry.put('site', site);
                
                var currentStatus = ipStatus.get(subIpStr);
                if (currentStatus && currentStatus.type == "FREE") {
                    subIpEntry.put('type', "SUB");
                } else {
                    var oldType = currentStatus ? currentStatus.type : "UNKNOWN";
                    subIpEntry.put('type', oldType + "/SUB");
                }
                ipStatus.put(subIpStr, subIpEntry);
            }
        }
    }
}

var unusedIps = new Array();
for each (var key in ipStatus.keys) {
    var entry = ipStatus.get(key);
    ipMap.push(entry);
    if (entry.type == "FREE") {
        unusedIps.push(key);
    } else if (entry.type == "VSE") {
        System.warn("No sub-allocation for " + key);
    }
}

System.log("Total unique IP addresses found: " + ipStatus.keys.length);
System.log("Found " + unusedIps.length + " unused IPs in " + (System.getCurrentTime() - start) + " ms");

unusedIps.sort(function(a, b) {
    var aa = a.split(".");
    var bb = b.split(".");
    return (aa[0] * 16777216 + aa[1] * 65536 + aa[2] * 256 + aa[3] * 1) - 
           (bb[0] * 16777216 + bb[1] * 65536 + bb[2] * 256 + bb[3] * 1);
});

for (var k = 0; k < unusedIps.length; k++) {
    System.log("Unused IP #" + k + ": " + unusedIps[k]);    
}

return ipMap;
