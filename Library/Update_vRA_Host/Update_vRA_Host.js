/**
 * Simple task with custom script capability.
 *
 * @param {string} user
 * @param {string} name
 * @param {string} vraHost
 * @param {SecureString} password
 * @param {string} connectionType
 * @param {string} sessionMode
 * @param {VRA:Host} host
 * @return {string} errorCode
 * @return {VRA:Host} updatedHost
 */
VraHostManager.update({
    name: name,
    vraHost: vraHost,
    user: user,
    password: password,
    connectionType: connectionType,
    sessionMode: sessionMode
}, host);
updatedHost = host;
System.log("vRA connection "+  updatedHost.name + " updated successfully!");