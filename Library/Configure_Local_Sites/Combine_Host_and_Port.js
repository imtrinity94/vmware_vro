/**
 * Combine Host and Port
 *
 * @param {string} host
 * @param {number} port
 * @return {string} hostAndPort
 */
var u = new URL();
hostAndPort = u.escapeHost(host) + ":" + port;