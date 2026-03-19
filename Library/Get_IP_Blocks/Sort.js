/**
 * Sort
 *
 * @param {string} attrOrderBy
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges
 */
System.log("Parsing parameters for sorting [" + attrOrderBy + "]...");

var orderBy = {};
var splitedOrderBy = attrOrderBy.split(" ");
orderBy.ParameterName = splitedOrderBy[0].replace(":", "");
orderBy.IsAscending = splitedOrderBy.length == 1 || splitedOrderBy[1] == "ASC";

System.log("Sorting by ColumnName [" + orderBy.ParameterName +"], IsAscending [" + orderBy.IsAscending + "]...");

attrIpRanges.sort(dynamicSort(orderBy.ParameterName , orderBy.IsAscending));	

function dynamicSort(property, order) { 
	var propName = "Start";
	
	if (property == "name") {
		propName = "Start";
	} else if (property == "start") {
		propName = "Start";
	} else if (property == "end") {
		propName = "End";
	} else if (property = "description") {
		propName = "Description";
	}
	
	if (propName == "Description") {
		return function (a,b) {
			if (order == 1) {
        		return (a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0;
			} else {
				return (b[propName] < a[propName]) ? -1 : (b[propName] > a[propName]) ? 1 : 0;
			}
		}
	} else {
		return	function( a, b ) {
			var aIp = ipToLong(a[propName]);
			var bIp = ipToLong(b[propName]);
			
			if (order == 1) {
        		return aIp < bIp ? -1 : aIp > bIp ? 1 : 0;
			} else {
				return bIp < aIp ? -1 : bIp > aIp ? 1 : 0;
			}
		}
	}
}

function ipToLong(ip) {
  var ipl=0;
  ip.split('.').forEach(function( octet ) {
      ipl<<=8;
      ipl+=parseInt(octet);
  });
  return(ipl >>>0);
}