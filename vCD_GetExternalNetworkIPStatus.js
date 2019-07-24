var vcd = System.getModule("org.telus.vCloud").getvCloudHost();
var start=System.getCurrentTime();
System.debug("Scanning for external IP Status in external network "+net.name);
vcd.updateInternalState();
ipStatus=new Properties();
ipMap=new Array();
edgeMap=new Properties();

var config=net.configuration;
var ipScopes=config.ipScopes;
var ipScopeList=ipScopes.ipScope;
for each (ipScope in ipScopeList.enumerate()) {
	System.debug("  IPScopeListItem");
	var ipRanges=ipScope.ipRanges;
	var ipRangeList=ipRanges.ipRange;
	for each (var range in ipRangeList.enumerate()) {
		System.debug("    Range:"+range.startAddress+" - "+range.endAddress);
		var first=System.getModule("com.telus.agilit.vcd.util").ipStrToInt(range.startAddress);
		var last=System.getModule("com.telus.agilit.vcd.util").ipStrToInt(range.endAddress);
		for (var ip=first;ip<=last;ip++) {
			var ipStr=System.getModule("com.telus.agilit.vcd.util").ipIntToStr(ip);
			//System.debug("      "+ipStr);
			var ipEntry=new Properties();
			ipEntry.put('ip',ipStr);
			ipEntry.put('org','');
			ipEntry.put('network','');
			ipEntry.put('edge','');
			
			//Added by t851338 to provide a work around for vmware bug that marks a handful of IPs as free when they are really not
			if ((ipStr == '207.34.239.35') || (ipStr == '207.34.239.39') || (ipStr == '207.34.239.86') || (ipStr == '207.34.239.87') || (ipStr == '207.34.239.88') 
				|| (ipStr == '207.34.239.237') || (ipStr == '207.34.239.238') || (ipStr == '207.34.239.239')) 
			{
				ipEntry.put('type',"VSE");	
			}
			else
			{
				ipEntry.put('type',"FREE");
			}
			
			ipEntry.put('site',site);
			ipStatus.put(ipStr,ipEntry);
		}
	}
	var addresses=ipScope.allocatedIpAddresses.ipAddress;
	System.debug("Allocated Addresses: ");
	//	System.getModule("org.dojotoolkit.dojo.json").serialize(addresses.enumerate()));
	for each (var addr in addresses.enumerate()) {
		System.debug("  VSE:"+addr);
		var ipEntry=new Properties();
		ipEntry.put('ip',addr);
		ipEntry.put('org','Unknown');
		ipEntry.put('network','Unknown');
		ipEntry.put('edge','Unknown');
		ipEntry.put('type',"VSE");
		ipEntry.put('site',site);
		ipStatus.put(addr,ipEntry);
	}
	var allocs=ipScope.subAllocations.subAllocation;
	System.debug("Sub Allocations");
	for each (var alloc in allocs.enumerate()) {
		var edgeName=alloc.edgeGateway.name;
		var orgName='Unknown';
		if (needDetails) {
			var edge=edgeMap.get(alloc.edgeGateway.href);
			if (!edge) {
				edge=vcd.getEntityByReference(VclFinderType.GATEWAY,alloc.edgeGateway);
				edgeMap.put(alloc.edgeGateway.href,edge);
			}
			var org=edge.parent.parent;
			orgName=org.name;
		}
		var ipRanges=alloc.ipRanges;
		var ipRangeList=ipRanges.ipRange;
		for each (var range in ipRangeList.enumerate()) {
			System.debug(edgeName+" Range:"+range.startAddress+" - "+range.endAddress);
			var first=System.getModule("com.telus.agilit.vcd.util").ipStrToInt(range.startAddress);
			var last=System.getModule("com.telus.agilit.vcd.util").ipStrToInt(range.endAddress);
			for (var ip=first;ip<=last;ip++) {
				var ipStr=System.getModule("com.telus.agilit.vcd.util").ipIntToStr(ip);
				var ipEntry=new Properties();
				ipEntry.put('ip',ipStr);
				ipEntry.put('org',orgName);
				ipEntry.put('network','???');
				ipEntry.put('edge',edgeName);
				ipEntry.put('site',site);
				if (ipStatus.get(ipStr).type=="FREE") {
					System.debug("  SUB:"+edgeName+" "+ipStr);
					ipEntry.put('type',"SUB");
				} else {
					System.debug("  VSE/SUB:"+edgeName+" "+ipStr);
					ipEntry.put('type',ipStatus.get(ipStr).type+"/SUB");
				}
				ipStatus.put(ipStr,ipEntry);
			}
		}
	}
}

unusedIps=new Array();
for each (var ip in ipStatus.keys) {
	//System.debug(ip+" = "+ipStatus.get(ip));
	ipMap.push(ipStatus.get(ip));
	if (ipStatus.get(ip).type=="FREE") {
		unusedIps.push(ip);
	} else if (ipStatus.get(ip).type=="VSE") {
		System.warn("No sub-allocation for "+ip);
	} else if (ipStatus.get(ip).type=="SUB") {
		System.debug("Sub-allocation only for "+ip);
	}
}
System.log("Found "+ipMap.length+" total IP addresses1");
System.log("Found "+ipStatus.keys.length+" total IP addresses2");
System.log("Found "+unusedIps.length+" unused IPs  in "+(System.getCurrentTime()-start)+" ms");

unusedIps.sort(
    function( a, b )
    {
	var aa = a.split(".");
	var bb = b.split(".");
	
        return ( aa[0]*0x1000000 + aa[1]*0x10000 + aa[2]*0x100 + aa[3]*1 )
             - ( bb[0]*0x1000000 + bb[1]*0x10000 + bb[2]*0x100 + bb[3]*1 );
    }
);

for(var i = 0; i < unusedIps.length; i++){
	System.log("Unused IP #" + i + ": " + unusedIps[i]);	
}
