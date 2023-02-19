var telnetClient = new TelnetClient();
System.log("Connecting...");
telnetClient.connect("towel.blinkenlights.nl");
System.log("Connected!");
 
var i = 0;
var MAXIMUM_TRIES_WITHOUT_DATA = 50;
 
while(telnetClient.isAvailable() &amp;amp;amp;&amp;amp;amp; i &amp;amp;lt; MAXIMUM_TRIES_WITHOUT_DATA) {
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
