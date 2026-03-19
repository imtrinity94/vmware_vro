/**
 * @description Retrieves all active workflow tokens (runs) that belong to the currently
 *              authenticated user.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {WorkflowToken[]} An array of WorkflowToken objects for the current user.
 */

var allTokens = Server.findAllForType('WorkflowToken');
var currentUser = Server.getCredential().username;
var res = [];
for (var i = 0; i < allTokens.length; i++) {
    if (allTokens[i].runningUserName == currentUser) {
        res.push(allTokens[i]);
    }
}
return res;
