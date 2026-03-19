/**
 * Set outputs
 *
 * @param {string} attrNetworkView
 * @param {string} startAddress
 * @param {string} endAddress
 * @param {string} gateway
 * @return {string} ipRangeIdOut
 * @return {string} addressSpaceIdOut
 * @return {string} startAddressOut
 * @return {string} endAddressOut
 * @return {string} gatewayOut
 */
ipRangeIdOut = "range/" + attrNetworkView + "/" + startAddress + "/" + endAddress;
addressSpaceIdOut = attrNetworkView;
startAddressOut = startAddress;
endAddressOut = endAddress;
gatewayOut = gateway;
