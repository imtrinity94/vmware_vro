/**
 * Construct vSAN URL
 *
 * @param {string} host
 * @param {number} port
 * @return {string} url
 */
var u = new URL("https://w.com/#about");
url = u.escapeHost(host) + ":" + port;