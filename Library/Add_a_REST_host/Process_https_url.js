/**
 * Process https url
 *
 * @param {string} url
 * @param {string} proxyAuthentication
 * @return {string} host
 */
if (proxyAuthentication == "Basic") {
  throw "For security reasons proxy basic authentication is not allowed with https endpoints!";
}

host = url.substring(8, url.length);
var end = host.indexOf("/");
if (end != -1) {
	host = host.substring(0, end);
}
System.log(url);