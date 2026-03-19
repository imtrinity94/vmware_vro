/**
 * Get a host from a base URL
 *
 * @param {string} url
 * @return {string} host
 */
host = url.substring(8, url.length);

var end = host.indexOf("/");
if (end != -1) {
	host = host.substring(0, end);
}
