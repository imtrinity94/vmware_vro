/**
 * Construct URL
 *
 * @param {string} host
 * @param {string} port
 * @return {string} sslUrl
 */
sslUrl = "https://" + host + ((port) ? ":" + port : ":5986") + "/wsman/";
System.log("Manage SSL certificate called for URL->" + sslUrl );