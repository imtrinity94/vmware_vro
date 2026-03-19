/**
 * Calculates and returns all IP addresses in a range between two provided IPs.
 * Excludes ".0" and ".255" addresses as they are typically network/broadcast identifiers.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} startIP The starting IP address (e.g., "192.123.78.1").
 * @param {string} endIP The ending IP address (e.g., "192.123.79.29").
 * @returns {string[]} An array of IP addresses in the range.
 */

var IPArray = [];

var startIPOctet = startIP.split(".");
if (startIPOctet.length !== 4) { throw "Invalid Start IP: " + startIP; }
var startIPNumber = parseInt(startIPOctet[0]) * 256 * 256 * 256 +
    parseInt(startIPOctet[1]) * 256 * 256 +
    parseInt(startIPOctet[2]) * 256 +
    parseInt(startIPOctet[3]);

var endIPOctet = endIP.split(".");
if (endIPOctet.length !== 4) { throw "Invalid End IP: " + endIP; }
var endIPNumber = parseInt(endIPOctet[0]) * 256 * 256 * 256 +
    parseInt(endIPOctet[1]) * 256 * 256 +
    parseInt(endIPOctet[2]) * 256 +
    parseInt(endIPOctet[3]);

var difference = endIPNumber - startIPNumber;

if (difference < 0) {
    throw "Start IP is higher than End IP";
}

for (var i = 0; i <= difference; i++) {
    var temp = startIPNumber + i;
    var a = temp & 255;
    var b = (temp >> 8) & 255;
    var c = (temp >> 16) & 255;
    var d = (temp >> 24) & 255;
    
    if (a != 0 && a != 255) { // .0 would be considered as a network identifier and .255 would be a broadcasting address.
        var IP = d + "." + c + "." + b + "." + a;
        IPArray.push(IP);
        System.log(IP);
    }
}

return IPArray;
