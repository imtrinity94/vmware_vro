/**
 * Simple task with custom script capability.
 *
 * @param {string} connectionType
 * @param {string} cloudHost
 * @param {SecureString} apiToken
 * @param {string} name
 * @param {string} sessionMode
 * @return {string} erroCode
 * @return {VRA:Host} host
 */
var sid = VraHostManager.save({
    name: name,
    cloudHost: cloudHost,
    connectionType: connectionType,
    apiToken: apiToken,
    sessionMode: sessionMode
}, null);

host = Server.findForType("VRA:Host", sid);
System.log("vRA connection " + host.name + " created successfully!");