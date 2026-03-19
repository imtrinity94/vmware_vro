/**
 * combine host and port and generate vSphere services list
 *
 * @param {string} host
 * @param {number} port
 * @param {string} pbmUrl
 * @param {string} smsUrl
 * @return {string} hostAndPort
 * @return {Array/string} serviceUrls
 */
var servicesUrlsArray = [];
var u = new URL();
hostAndPort = u.escapeHost(host) + ":" + port;

servicesUrlsArray.push(hostAndPort);

if (pbmUrl && pbmUrl.trim()) {
  servicesUrlsArray.push(pbmUrl.trim());
}

if (smsUrl && smsUrl.trim()) {
  servicesUrlsArray.push(smsUrl.trim());
}

serviceUrls = servicesUrlsArray;