/**
 * Active Session to VC
 *
 * @param {VC:SdkConnection} vCenter
 * @param {string} oldSessionId
 * @param {string} oldCookie
 * @param {REST:RESTHost} vcHost
 * @param {string} vcUserName
 * @param {SecureString} vcPassword
 * @return {string} sessionId
 * @return {string} cookie
 */
if (vCenter.sessionManager.sessionIsActive(oldSessionId, vcUserName)) {
    sessionId = oldSessionId;
    cookie = oldCookie;
} else {
    var userSession = System.getModule("com.vmware.library.spbm").loginvCenter(vcHost, vcUserName, vcPassword);
    if (userSession == null) {
        throw "Login vCenter failed";
    }
    sessionId = userSession.sessionId;
    cookie = userSession.cookie;
}
