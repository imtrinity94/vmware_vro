/**
 * Connects to a Telnet server and streams all available output until no new data
 * is received for a maximum number of consecutive attempts, then disconnects.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} host Telnet server host.
 * @param {number} [port=23] Telnet server port.
 * @returns {void}
 */

var telnetClient = new TelnetClient();
var targetHost = "towel.blinkenlights.nl"; // Default from snippet
System.log("Connecting to " + targetHost + "...");

try {
    telnetClient.connect(targetHost);
    System.log("Connected!");

    var i = 0;
    var MAXIMUM_TRIES_WITHOUT_DATA = 50;

    while (telnetClient.isAvailable() && i < MAXIMUM_TRIES_WITHOUT_DATA) {
        var dataAvailable = telnetClient.waitForData(200);
        if (dataAvailable) {
            System.log(telnetClient.receiveAsString());
            i = 0;
        } else {
            i++;
        }
    }
} catch (e) {
    System.error("Telnet connection failed: " + e);
} finally {
    System.log("Disconnecting...");
    telnetClient.disconnect();
}
