/**
 * Checks the ping status of a given VM name within a domain.
 * Executes a single ping command and returns the status as a string.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} vmName The hostname of the VM.
 * @param {string} domainName The domain name to append (e.g., "example.com").
 * @returns {string} Ping status message.
 */

var fullVmName = vmName + "." + domainName;
var cmd = "ping -q -c 1 " + fullVmName;
var pingCommand = new Command(cmd);
pingCommand.execute(true);

System.log("Ping result: " + pingCommand.output + " " + pingCommand.result);

if (pingCommand.result == 0) {
    return "Ping response is Ok";
}

return "Ping response was null or failed";
