/**
 * Simple task with custom script capability.
 *
 * @param {string} userName
 * @param {SecureString} password
 * @param {string} host
 */
var test = System.getModule("com.lenovo.library.xclarity").createRegistrationLXCA(userName,password,host);
System.log("Registration of XClarity Administrator \"" +host +"\" done successfully.");