/**
 * Initialize
 *
 * @param {string} id
 * @param {string} url
 * @param {string} username
 * @param {SecureString} password
 * @param {number} priority
 * @param {InfobloxIPAM:IpamApiType} apiType
 * @return {InfobloxIPAM:IpamConnection} attrInputConnection
 */
var tempUrl = url.replace("https://","");
attrInputConnection = new IpamConnection(id, tempUrl, username, password, apiType);
attrInputConnection.connectionPriority = priority;