/**
 * Prints the Java version used by the vRealize Orchestrator scripting engine.
 * Requires the system property `com.vmware.js.allow-local-process` to be set to `true`.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// Set System properties:
// com.vmware.js.allow-local-process to true
// Run this code in action
try {
    var cmd = new Command("jdk/bin/java --version");
    cmd.execute(true);
    System.log("Scripting Engine Java Version Output:");
    System.log(cmd.output);
} catch (e) {
    System.error("Failed to execute local process. Ensure 'com.vmware.js.allow-local-process' is enabled. Error: " + e);
}
