/**
 * @description Connects to a Telnet server and streams all available output until no new data
 *              is received for a maximum number of consecutive attempts, then disconnects.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

var telnetClient = new TelnetClient();
System.log("Connecting...");
telnetClient.connect("towel.blinkenlights.nl");
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

System.log("Disconnecting...");
telnetClient.disconnect();
