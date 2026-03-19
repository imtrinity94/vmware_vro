/**
 * @description Prints the Java version used by the vRO scripting engine by executing the
 *              `jdk/bin/java --version` command via vRO's Command API.
 *
 * @note Requires the system property `com.vmware.js.allow-local-process` to be set to `true`.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

// Set System properties:
// com.vmware.js.allow-local-process to true
// Run this code in action
var com = new Command("jdk/bin/java --version");
com.execute(true);
System.log(com.output);
