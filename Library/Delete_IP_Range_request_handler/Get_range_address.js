/**
 * Get range address
 *
 * @param {string} attrIpRangeId - [object Object]
 * @return {string} attrStartAddress - [object Object]
 * @return {string} attrEndAddress - [object Object]
 * @return {string} attrNetworkView - [object Object]
 */
var componets = attrIpRangeId.split("/");
attrNetworkView = componets[1];
attrStartAddress = componets[2];
attrEndAddress = componets[3];