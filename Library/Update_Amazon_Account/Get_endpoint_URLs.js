/**
 * Get endpoint URLs
 *
 * @param {string} proxyHost - [object Object]
 * @param {number} proxyPort - [object Object]
 * @return {Array/string} endpoints - [object Object]
 * @return {Properties} proxySettings - [object Object]
 */
var regions = AWSRegionManager.findAllRegions();

var endpointsArray = new Array();

for (var i = 0; i < regions.length; i ++) {
  endpointsArray.push("https://" + regions[i].getEndpoint()); 
}

endpoints = endpointsArray;

proxySettings = new Properties();
if (proxyHost) {
  proxySettings.put("HTTP.PROXY_HOST", proxyHost);
  proxySettings.put("HTTP.PROXY_PORT", proxyPort);
}