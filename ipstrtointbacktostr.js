//ipstring == "192.19.23.1"
var ipFields = ipString.split(".");
var ipNumber = parseInt(ipFields[0]) * 256 * 256 * 256 + 
	parseInt(ipFields[1]) * 256 * 256 + 
	parseInt(ipFields[2]) * 256 +
	parseInt(ipFields[3]);

var a = ipNumber & 255;;
var b = (ipNumber >> 8) & 255;
var c = (ipNumber >> 16) & 255;
var d = (ipNumber >> 24) & 255;

return (d + "." + c + "." + b + "." + a);
