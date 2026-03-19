/**
 * Get host from base url
 *
 * @param {string} controller
 * @param {string} host
 * @return {string} host
 */
var flag=(controller.indexOf('https') == 0);
if(flag){
	host = controller.substring(8, controller.length);
	var end = host.indexOf("/");
	if (end != -1) {
	host = host.substring(0, end);
	}
}else{
	host=controller;
}