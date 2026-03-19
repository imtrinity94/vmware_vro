/**
 * Convert ranges
 *
 * @param {Array/Any} attrIpamRanges
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrConvertedRanges
 */
System.log("Converting IPAM ranges to IP ranges...");

attrConvertedRanges = new Array();

for (var i = 0; i < attrIpamRanges.length; i++) {
	var currentRange = attrIpamRanges[i];
	var dhcpOptions = currentRange.dhcpOptions;
	
	var id = "range/" + currentRange.networkView + "/" + currentRange.startAddress + "/" + currentRange.endAddress;
	var name = currentRange.startAddress + " - " + currentRange.endAddress;
	
	var gateway = null;
	var dnsSuffix = null;
	var dnsSearchSuffixes = null;
	var primaryDns = null;
	var secondaryDns = null;
	var primaryWins = null;
	var secondaryWins = null;
	
	if(dhcpOptions) {
		if (dhcpOptions.routers && (dhcpOptions.routers.length > 0)) {
			gateway = dhcpOptions.routers[0];
		}
		
		dnsSuffix = dhcpOptions.domainName;
		
		if (dhcpOptions.domainSearch && (dhcpOptions.domainSearch.length > 0)) {
			dnsSearchSuffixes = dhcpOptions.domainSearch.join(",");
		}
	
		if (dhcpOptions.domainNameServers && (dhcpOptions.domainNameServers.length > 0)) {
			primaryDns = dhcpOptions.domainNameServers[0];
			if (dhcpOptions.domainNameServers.length > 1) {
				secondaryDns = dhcpOptions.domainNameServers[1];
			}
		}
		
		if (dhcpOptions.netbiosNameServers && (dhcpOptions.netbiosNameServers.length > 0)) {
			primaryWins = dhcpOptions.netbiosNameServers[0];
			if (dhcpOptions.netbiosNameServers.length > 1) {
				secondaryWins = dhcpOptions.netbiosNameServers[1];
			}
		}
	}

	attrConvertedRanges.push({
		ID: id,
		Name: name,
		Description: currentRange.comment,
		Start: currentRange.startAddress,
		End: currentRange.endAddress,
		IPVersion: 'IPv4',
		AddressSpaceId: currentRange.networkView,
		Gateway: gateway,
		SubnetPrefixLength: currentRange.networkCidr,
		PrimaryDNS: primaryDns,
		SecondaryDNS: secondaryDns,
		PrimaryWINS: primaryWins,
		SecondaryWINS: secondaryWins,
		DNSSuffix: dnsSuffix,
		DNSSearchSuffixes: dnsSearchSuffixes,
		ExtensionData: new Properties()
	});
}
