/**
 * Convert containers
 *
 * @param {Array/Any} attrIpamContainers
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrConvertedContainers
 */
System.log("Converting IPAM network containers to IP ranges...");

attrConvertedContainers = new Array();

for (var i = 0; i < attrIpamContainers.length; i++) {
	var currentContainer = attrIpamContainers[i];
	var dhcpOptions = currentContainer.dhcpOptions;
	
	var id = "networkcontainer/" + currentContainer.networkView + "/" + currentContainer.address + "/" + currentContainer.cidr;
	var name = currentContainer.address + "/" + currentContainer.cidr;

	var tempNetwork = currentContainer.address;
	var tempCIDR = currentContainer.cidr;
	var tempNetworkStart = ipToLong(tempNetwork)
	var tempMask = u(~0 << (32 - +tempCIDR))
	var last = u(~0 ^ tempMask) -1;
	var start = ip(u(tempNetworkStart + 1));
	var end = ip(u(tempNetworkStart + last));
	
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

	attrConvertedContainers.push({
		ID: id,
		Name: name,
		Description: currentContainer.comment,
		Start: start,
		End: end,
		IPVersion: 'IPv4',
		AddressSpaceId: currentContainer.networkView,
		Gateway: gateway,
		SubnetPrefixLength: currentContainer.cidr,
		PrimaryDNS: primaryDns,
		SecondaryDNS: secondaryDns,
		PrimaryWINS: primaryWins,
		SecondaryWINS: secondaryWins,
		DNSSuffix: dnsSuffix,
		DNSSearchSuffixes: dnsSearchSuffixes,
		ExtensionData: new Properties()
	});
}

// we need to treat the numbers as unsigned
function u(n) {
	return n >>> 0;	
}

function ip(n) {
    return [
        (n >>> 24) & 0xFF,
       	(n >>> 16) & 0xFF,
       	(n >>>  8) & 0xFF,
        (n >>>  0) & 0xFF
    ].join('.');
}

function ipToLong(ip){
  var ipl=0;
  ip.split('.').forEach(function( octet ) {
      ipl<<=8;
      ipl+=parseInt(octet);
  });
  return(ipl >>>0);
}