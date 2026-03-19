/**
 * Scans a vCloud Director External Network to determine the status of all IP addresses.
 * Categorizes IPs as FREE, VSE (allocated to Edge), or SUB (sub-allocated).
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:ExternalNetwork} vcloudNetwork - The External Network to scan.
 * @param {string} datacenterSiteLabel - Site identifier string.
 * @param {boolean} fetchAdditionalDetails - If true, retrieves additional organization and edge details.
 * @returns {Properties[]} resultsIpStatusArray - Array of properties objects describing each IP status.
 */

var vcloudHostHandle = System.getModule("org.telus.vCloud").getvCloudHost();
vcloudHostHandle.updateInternalState();

var scanStartTime = System.getCurrentTime();
System.log("Initiating IP Status Audit for Network: " + vcloudNetwork.name);

var ipStatusRegistryMap = new Properties();
var resultsIpStatusArray = [];
var edgeCacheProps = new Properties();

var networkConfigObj = vcloudNetwork.configuration;
var ipScopesArray = networkConfigObj.ipScopes.ipScope.enumerate();

var i;
for (i = 0; i < ipScopesArray.length; i++) {
    var ipScopeItem = ipScopesArray[i];
    
    // Phase 1: Initialize all defined IP ranges as FREE or problematic overrides
    var definedRangesList = ipScopeItem.ipRanges.ipRange.enumerate();
    var j;
    for (j = 0; j < definedRangesList.length; j++) {
        var rangeObj = definedRangesList[j];
        System.debug("  Scanning Primary Range: " + rangeObj.startAddress + " to " + rangeObj.endAddress);
        
        var firstIpInt = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(rangeObj.startAddress);
        var lastIpInt = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(rangeObj.endAddress);
        
        var ipCursor;
        for (ipCursor = firstIpInt; ipCursor <= lastIpInt; ipCursor++) {
            var currentIpStr = System.getModule("com.telus.agilit.vcd.util").ipIntToStr(ipCursor);
            var statusEntryObj = new Properties();
            statusEntryObj.put('ip', currentIpStr);
            statusEntryObj.put('org', '');
            statusEntryObj.put('network', '');
            statusEntryObj.put('edge', '');
            statusEntryObj.put('site', datacenterSiteLabel);
            
            // Workaround for specific network-layer problematic IPs known to be hijacked/reserved
            var reservedProblematicIps = [
                '207.34.239.35', '207.34.239.39', '207.34.239.86', '207.34.239.87', 
                '207.34.239.88', '207.34.239.237', '207.34.239.238', '207.34.239.239'
            ];
            
            statusEntryObj.put('type', (reservedProblematicIps.indexOf(currentIpStr) !== -1) ? "VSE" : "FREE");
            ipStatusRegistryMap.put(currentIpStr, statusEntryObj);
        }
    }
    
    // Phase 2: Interrogate explicitly allocated VSE (Edge) addresses
    var allocatedVseList = ipScopeItem.allocatedIpAddresses.ipAddress.enumerate();
    var k;
    for (k = 0; k < allocatedVseList.length; k++) {
        var vseIpStr = allocatedVseList[k];
        System.debug("    Targeting Explicit VSE Allocation: " + vseIpStr);
        
        var vseEntryObj = new Properties();
        vseEntryObj.put('ip', vseIpStr);
        vseEntryObj.put('org', 'System-Reserved');
        vseEntryObj.put('network', 'VSE-Allocated');
        vseEntryObj.put('edge', 'Edge-Intrinsic');
        vseEntryObj.put('type', "VSE");
        vseEntryObj.put('site', datacenterSiteLabel);
        
        ipStatusRegistryMap.put(vseIpStr, vseEntryObj);
    }
    
    // Phase 3: Audit Sub-Allocations (Tenant Gateways)
    var tenantSubAllocationsList = ipScopeItem.subAllocations.subAllocation.enumerate();
    var m;
    for (m = 0; m < tenantSubAllocationsList.length; m++) {
        var subAllocEntry = tenantSubAllocationsList[m];
        var assignedEdgeName = subAllocEntry.edgeGateway.name;
        var owningOrgName = 'Unknown';
        
        if (fetchAdditionalDetails) {
            var cachedEdge = edgeCacheProps.get(subAllocEntry.edgeGateway.href);
            if (!cachedEdge) {
                cachedEdge = vcloudHostHandle.getEntityByReference(VclFinderType.GATEWAY, subAllocEntry.edgeGateway);
                edgeCacheProps.put(subAllocEntry.edgeGateway.href, cachedEdge);
            }
            if (cachedEdge && cachedEdge.parent && cachedEdge.parent.parent) {
                owningOrgName = cachedEdge.parent.parent.name;
            }
        }
        
        var subRangesArray = subAllocEntry.ipRanges.ipRange.enumerate();
        var n;
        for (n = 0; n < subRangesArray.length; n++) {
            var subRangeObj = subRangesArray[n];
            var subFirstInt = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(subRangeObj.startAddress);
            var subLastInt = System.getModule("com.telus.agilit.vcd.util").ipStrToInt(subRangeObj.endAddress);
            
            var subCursor;
            for (subCursor = subFirstInt; subCursor <= subLastInt; subCursor++) {
                var subIpStr = System.getModule("com.telus.agilit.vcd.util").ipIntToStr(subCursor);
                var subEntryObj = new Properties();
                subEntryObj.put('ip', subIpStr);
                subEntryObj.put('org', owningOrgName);
                subEntryObj.put('network', 'Tenant-Subnet');
                subEntryObj.put('edge', assignedEdgeName);
                subEntryObj.put('site', datacenterSiteLabel);
                
                var existingRegistryEntry = ipStatusRegistryMap.get(subIpStr);
                if (existingRegistryEntry && existingRegistryEntry.type === "FREE") {
                    subEntryObj.put('type', "SUB");
                } else {
                    var conflictType = existingRegistryEntry ? existingRegistryEntry.type : "LOST";
                    subEntryObj.put('type', conflictType + "/SUB");
                }
                ipStatusRegistryMap.put(subIpStr, subEntryObj);
            }
        }
    }
}

// Phase 4: Finalize and audit results
var unusedIpsCollection = [];
var registryKeysList = ipStatusRegistryMap.keys;
var p;
for (p = 0; p < registryKeysList.length; p++) {
    var lookupKey = registryKeysList[p];
    var finalizedEntry = ipStatusRegistryMap.get(lookupKey);
    resultsIpStatusArray.push(finalizedEntry);
    
    if (finalizedEntry.type === "FREE") {
        unusedIpsCollection.push(lookupKey);
    } else if (finalizedEntry.type === "VSE") {
        System.warn("VSE Address Conflict Check: No sub-allocation discovered for VSE address " + lookupKey);
    }
}

System.log("--- External Network Audit Summary ---");
System.log("Discovered Unique IPs: " + registryKeysList.length);
System.log("Total Free Capacity: " + unusedIpsCollection.length);
System.log("Processing Time: " + (System.getCurrentTime() - scanStartTime) + " ms");

// Sort and log free IPs for report visibility
unusedIpsCollection.sort(function (a, b) {
    var octetsA = a.split(".");
    var octetsB = b.split(".");
    var valA = (octetsA[0] * 16777216) + (octetsA[1] * 65536) + (octetsA[2] * 256) + (octetsA[3] * 1);
    var valB = (octetsB[0] * 16777216) + (octetsB[1] * 65536) + (octetsB[2] * 256) + (octetsB[3] * 1);
    return valA - valB;
});

var s;
for (s = 0; s < unusedIpsCollection.length; s++) {
    System.debug("Available IP #" + (s + 1) + ": " + unusedIpsCollection[s]);    
}

return resultsIpStatusArray;
