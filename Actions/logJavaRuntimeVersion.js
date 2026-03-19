/**
 * Prints the Java version used by the vRealize Orchestrator scripting engine.
 * Requires the system property `com.vmware.js.allow-local-process` to be set to `true`.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// Prerequisites:
// Set Server System properties: 'com.vmware.js.allow-local-process' to 'true'

try {
    System.log("Attempting to query local Java runtime version...");
    var javaVersionCommand = new Command("jdk/bin/java --version");
    
    // Execute command synchronously
    javaVersionCommand.execute(true);
    
    System.log("--- vRO Scripting Engine Java Runtime Information ---");
    System.log(javaVersionCommand.output);
    System.log("-----------------------------------------------------");
} catch (procEx) {
    System.error("Execution failed. Verify that 'com.vmware.js.allow-local-process' is set to true in vRO Control Center via System Properties. Error: " + procEx);
}

return null;
