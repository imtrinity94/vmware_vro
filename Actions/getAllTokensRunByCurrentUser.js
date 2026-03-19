/**
 * @description Retrieves all active workflow tokens (runs) that belong to the currently
 *              authenticated user.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {WorkflowToken[]} currentUserTokensList - An array of WorkflowToken objects for the current user.
 */

var allSystemTokensList = Server.findAllForType('WorkflowToken');
var currentUserName = Server.getCredential().username;
var currentUserTokensList = [];

var i;
for (i = 0; i < allSystemTokensList.length; i++) {
    var tokenObj = allSystemTokensList[i];
    if (tokenObj.runningUserName == currentUserName) {
        currentUserTokensList.push(tokenObj);
    }
}

System.log("Found " + currentUserTokensList.length + " workflow tokens owned by user: " + currentUserName);

return currentUserTokensList;
