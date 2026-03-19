/**
 * Simple task with custom script capability.
 *
 * @param {string} connectionType
 * @param {string} name
 * @param {string} cloudHost
 * @param {SecureString} apiToken
 * @param {boolean} ignoreWarnings
 * @param {string} sessionMode
 * @param {VRA:Host} host
 * @return {string} errorCode
 * @return {VRA:Host} updatedHost
 */
VraHostManager.update({
    connectionType: connectionType,
    name: name,
    cloudHost: cloudHost,
    apiToken: apiToken,
    sessionMode: sessionMode
}, host);
updatedHost = host;
System.log("vRA connection "+  updatedHost.name + " updated successfully!");