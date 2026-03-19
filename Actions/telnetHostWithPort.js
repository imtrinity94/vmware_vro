/**
 * @description
 * Connects to a remote host using TelnetClient, reads any available banner/output,
 * and disconnects after a period of inactivity.
 *
 * NOTE:
 * - When used on port 22, this only captures the SSH banner (no authentication).
 *
 * @param {string} host - Target hostname or IP
 * @param {number} port - Target port (e.g., 22 or 23)
 *
 * @example
 * Input:
 * host = "172.10.20.151"
 * port = 22
 *
 * Expected Output:
 * Connecting to 172.10.20.151:22...
 * Connected!
 * SSH-2.0-OpenSSH_8.7
 * Disconnecting...
 */

var host = (typeof host !== "undefined" && host) ? host : "example.com";
var port = (typeof port !== "undefined" && port) ? port : 22;

try {
    var telnetClient = new TelnetClient();

    System.log("Connecting to " + host + ":" + port + "...");
    telnetClient.connect(host, port);

    if (!telnetClient.isAvailable()) {
        throw "Connection established but no data stream available.";
    }

    System.log("Connected!");

    var i = 0;
    var MAXIMUM_TRIES_WITHOUT_DATA = 50;

    while (i < MAXIMUM_TRIES_WITHOUT_DATA) {
        var dataAvailable = telnetClient.waitForData(200);

        if (dataAvailable) {
            var output = telnetClient.receiveAsString();
            System.log(output);
            i = 0;
        } else {
            i++;
        }
    }

} catch (e) {
    System.error("Telnet connection failed: " + e);
} finally {
    try {
        System.log("Disconnecting...");
        telnetClient.disconnect();
    } catch (ignore) { }
}