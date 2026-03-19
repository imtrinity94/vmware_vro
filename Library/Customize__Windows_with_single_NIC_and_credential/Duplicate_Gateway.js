/**
 * Duplicate Gateway
 *
 * @param {Array/string} gateway
 * @return {Array/string} gateways
 */
gateways = new Array();
if (gateway != null && gateway.length > 0) {
	gateways.push(gateway[0]);
	gateways.push(gateway[0]);	
}