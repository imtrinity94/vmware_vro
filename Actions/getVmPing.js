/**
 * Checks the ping status of a given VM name within a domain.
 * Executes a single ping command and returns the status as a string.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} vmHostname - The hostname of the VM.
 * @param {string} domainFqdn - The domain name to append (e.g., "example.com").
 * @returns {string} pingStatusMessage - Ping status message.
 */

var targetFqdn = vmHostname + "." + domainFqdn;
var pingCmdString = "ping -q -c 1 " + targetFqdn;
var pingExecutable = new Command(pingCmdString);

System.log("Executing ping command for: " + targetFqdn);
pingExecutable.execute(true);

System.debug("Ping Exit Code: " + pingExecutable.result);
System.debug("Ping Output: " + pingExecutable.output);

if (pingExecutable.result === 0) {
    return "Ping response is Ok for " + targetFqdn;
}

return "Ping response failed or timed out for " + targetFqdn;
