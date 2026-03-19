/**
 * Get range address
 *
 * @param {string} attrExternalRangeId
 * @return {string} attrStartAddress
 * @return {string} attrEndAddress
 * @return {string} attrNetworkView
 */
var componets = attrExternalRangeId.split("/");
attrNetworkView = componets[1];
attrStartAddress = componets[2];
attrEndAddress = componets[3];