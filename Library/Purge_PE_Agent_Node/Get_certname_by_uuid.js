/**
 * Get certname by uuid
 *
 * @param {string} uuid
 * @param {Puppet:Master} activePuppetMaster
 * @param {string} errorCode
 * @return {string} puppetNodeCertname
 * @return {string} errorCode
 */
System.log("Getting node certname for UUID: " + uuid);

var master = activePuppetMaster;
var masterHostname = master.host;
var vroUser = master.username;
var vroPassword = master.password;
var tokenRequestSession;
var token;
var pdbQuerySession;

try {
    // SSH session to PE master to obtain RBAC token
    tokenRequestSession = new SSHSession(masterHostname, vroUser);
    tokenRequestSession.connectWithPassword(vroPassword);
    System.debug(tokenRequestSession);

    var tokenRequest = "curl -s -k -X POST -H 'Content-Type: application/json' -d '{\"login\": \"" + vroUser + "\", \"password\": \"" + vroPassword + "\"}' https://" + masterHostname + ":4433/rbac-api/v1/auth/token";
    System.debug("token request command: " + tokenRequest);

    tokenRequestSession.executeCommand(tokenRequest, true);
    System.debug("token request output:" + tokenRequestSession.output);

    token = JSON.parse(tokenRequestSession.output).token;
    System.debug("extracted token: " + token);

    System.debug("token request results. exitCode=" + tokenRequestSession.exitCode + " output=" + tokenRequestSession.output + " error=" + tokenRequestSession.error);

    if (tokenRequestSession.exitCode !== 0) {
        var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", tokenRequestSession.output);
        if (!error) {
            error = "Failed to get puppet token. exitCode=" + tokenRequestSession.exitCode;
        }

        throw error;
    }

    // SSH session to PE master to perform PDB query to look up certname for vm uuid
    pdbQuerySession = new SSHSession(masterHostname, vroUser);
    pdbQuerySession.connectWithPassword(vroPassword);
    System.debug(pdbQuerySession);

    var query = 'inventory[certname] {facts.trusted.extensions.pp_uuid = "' + uuid + '"}';
    System.debug("PQL query for certname: " + query);

    var queryCommand = "curl -s -k -H 'X-Authentication:" + token + "' --data-urlencode 'query=" + query + "' -X GET https://" + masterHostname + ":8081/pdb/query/v4";
    System.debug("query command:" + queryCommand);

    pdbQuerySession.executeCommand(queryCommand, true);
    System.debug("query command output:" + pdbQuerySession.output);

    puppetNodeCertname = JSON.parse(pdbQuerySession.output)[0].certname;
    System.debug("extracted certname:" + puppetNodeCertname);

    System.debug("puppet query node certname for UUID. exitCode=" + pdbQuerySession.exitCode + " output=" + pdbQuerySession.output + " error=" + pdbQuerySession.error);

    if (pdbQuerySession.exitCode !== 0) {
        var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", pdbQuerySession.output);
        if (!error) {
            error = "Failed to get certname for UUID. exitCode=" + pdbQuerySession.exitCode;
        }
        throw error;
    }
} 
catch (error) {
  errorCode += "\n" + error + ".";
  throw errorCode;
} 
finally {
    if (tokenRequestSession) {
        try {
            tokenRequestSession.disconnect();
        }
        catch(e) {
            System.error("Error disconnecting tokenRequestSession SSH session (1 of 2) to " + masterHostname + ": " + e);
        }
    }
    if (pdbQuerySession) {
        try {
            pdbQuerySession.disconnect();
        }
        catch(e) {
            System.error("Error disconnecting pdbQuerySession SSH session (2 of 2) to " + masterHostname + ": " + e);
        }
    }
}