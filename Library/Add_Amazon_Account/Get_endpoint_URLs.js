/**
 * Get endpoint URLs
 *
 * @param {string} proxyHost
 * @param {number} proxyPort
 * @return {Array/string} endpoints - [object Object]
 * @return {Array/string} proxyHosts
 * @return {Array/number} proxyPorts
 */
var regions = AWSRegionManager.findAllRegions();

endpoints = new Array();
for (var i = 0; i < regions.length; i ++) {
  endpoints.push(regions[i].getEndpoint());
}