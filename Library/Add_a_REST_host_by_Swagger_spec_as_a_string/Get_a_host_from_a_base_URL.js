/**
 * Get a host from a base URL
 *
 * @param {string} url
 * @return {string} swaggerSpecHostname
 */
var hostname = url.substring(8, url.length);
var end = hostname.indexOf("/");
if (end != -1) {
	hostname = hostname.substring(0, end);
}
swaggerSpecHostname = hostname;