/**
 * Converts an IP string (e.g., "192.168.1.1") to its numeric representation, 
 * then back to a string through bitwise operations. Used for IP range calculations or validation.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} ipString The IP address string.
 * @returns {string} The reconstructed IP address string.
 */

var ipFields = ipString.split(".");
if (ipFields.length !== 4) {
    throw "Invalid IP format: " + ipString;
}

var ipNumber = parseInt(ipFields[0]) * 256 * 256 * 256 + 
               parseInt(ipFields[1]) * 256 * 256 + 
               parseInt(ipFields[2]) * 256 +
               parseInt(ipFields[3]);

var a = ipNumber & 255;
var b = (ipNumber >> 8) & 255;
var c = (ipNumber >> 16) & 255;
var d = (ipNumber >> 24) & 255;

return (d + "." + c + "." + b + "." + a);
