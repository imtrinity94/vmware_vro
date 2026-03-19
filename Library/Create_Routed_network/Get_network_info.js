/**
 * Get network info
 *
 * @param {Any} attrNetwork
 * @return {string} attrNetworkView
 * @return {string} attrIpRangeId
 * @return {string} attrIpRangeStart
 * @return {string} attrIpRangeEnd
 * @return {string} attrIpRangeGateway
 */
attrNetworkView = attrNetwork.networkView;

var attrIpRangeId = "network/" + attrNetwork.networkView + "/" + attrNetwork.address + "/" + attrNetwork.cidr;

var tempNetwork = attrNetwork.address;
var tempCIDR = attrNetwork.cidr;
var tempNetworkStart = ipToLong(tempNetwork)
var tempMask = u(~0 << (32 - +tempCIDR))
var last = u(~0 ^ tempMask) -1;
var first = ip(u(tempNetworkStart + 1));
var second = ip(u(tempNetworkStart + 2));
var end = ip(u(tempNetworkStart + last));

attrIpRangeGateway = first;
attrIpRangeStart = second;
attrIpRangeEnd = end;

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
