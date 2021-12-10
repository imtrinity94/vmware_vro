var IPArray = [];
var temp, IP = "";

var startIP = "192.123.78.1";


var startIPOctet = startIP.split(".");
var startIPNumber = parseInt(startIPOctet[0]) * 256 * 256 * 256 +
    parseInt(startIPOctet[1]) * 256 * 256 +
    parseInt(startIPOctet[2]) * 256 +
    parseInt(startIPOctet[3]);

var endIP = "192.123.79.29"

var endIPOctet = endIP.split(".");
var endIPNumber = parseInt(endIPOctet[0]) * 256 * 256 * 256 +
    parseInt(endIPOctet[1]) * 256 * 256 +
    parseInt(endIPOctet[2]) * 256 +
    parseInt(endIPOctet[3]);

var difference = endIPNumber - startIPNumber;

if (difference < 0) throw "Start IP is higher than End IP";

for (i = 0; i <= difference; i++) {
    temp = startIPNumber + i;
    var a = temp & 255;
    var b = (temp >> 8) & 255;
    var c = (temp >> 16) & 255;
    var d = (temp >> 24) & 255;
    if (a != 0 && a != 255) { // .0 would be considered as a network identifier and .255 would be a broadcasting address. Hence avoiding.
        IP = d + "." + c + "." + b + "." + a;
        IPArray.push(IP);
        System.log(IP);
    }
}
