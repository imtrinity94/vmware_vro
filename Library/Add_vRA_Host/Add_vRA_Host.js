/**
 * Simple task with custom script capability.
 *
 * @param {string} vRAUserName
 * @param {SecureString} vRAUserPassword
 * @param {string} connectionType
 * @param {string} vRAHostName
 * @param {string} vRAHostUrl
 * @param {string} sessionMode
 * @return {string} errorCode
 * @return {VRA:Host} host
 */
var sid = VraHostManager.save({
    name: vRAHostName,
    vraHost: vRAHostUrl,
    user: vRAUserName,
    password: vRAUserPassword,
    connectionType: connectionType,
    sessionMode: sessionMode
});

host = Server.findForType("VRA:Host", sid);
System.log("vRA Host " + host.name + " created successfully!");