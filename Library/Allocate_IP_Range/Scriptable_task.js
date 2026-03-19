/**
 * Simple task with custom script capability.
 *
 * @param {string} result
 * @param {string} netaddr
 * @param {number} cidr
 * @param {string} networkView
 * @return {string} outputs
 */
//var subnet = result
var networkString = result
var subnet = extractSubnet(networkString);
System.log("Extracted subnet: " + subnet);
var id = "network/" + networkView + "/" + subnet;
const resultant = calculateIpRange(subnet, cidr);
var dict_data = {
        "id": id,

        "name": "sample range new",

        "startIPAddress": resultant.firstUsableIp,

        "endIPAddress": resultant.lastUsableIp,

        "description": "sampleDescription",

        "ipVersion": "IPv4",

        "addressSpaceId": networkView,

        "subnetPrefixLength": cidr,

        "gatewayAddress": resultant.firstUsableIp,

        "domain": "test.local",

        "tags": [{
            "key": "Building",
            "value": "VMware main facility"
        }],

        "properties": {
        }
}
const x = {ipRange: dict_data}
outputs = JSON.stringify(x)

// Custom function to repeat a string 'str' for 'count' times
function repeatString(str, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += str;
    }
    return result;
}

// Function to convert decimal IP address to binary
function ipToBinary(ip) {
    var parts = ip.split('.').map(function(part) {
        return ("00000000" + (parseInt(part) >>> 0).toString(2)).slice(-8);
    });
    return parts.join('');
}

// Function to convert binary IP address to decimal
function binaryToIp(binary) {
    var ip = [];
    for (var i = 0; i < 4; i++) {
        ip.push(parseInt(binary.slice(i * 8, (i + 1) * 8), 2));
    }
    return ip.join('.');
}

// Function to convert binary string to decimal number
function binaryToLong(binary) {
    return parseInt(binary, 2);
}

// Function to convert decimal number to binary string (32-bit)
function longToBinary(long) {
    return ("00000000000000000000000000000000" + long.toString(2)).slice(-32);
}

function extractSubnet(networkString) {
    const match = networkString.match(/(\d+\.\d+\.\d+\.\d+\/\d+)/);
    return match ? match[0] : null;
}

// Function to calculate the network (start) IP, broadcast (end) IP, first usable IP, and last usable IP from CIDR
function calculateIpRange(subnet, cidr) {
    var ipBinary = ipToBinary(subnet); // Convert IP to binary
    
    // Create netmask in binary using the custom repeat function
    var netmaskBinary = repeatString("1", cidr) + repeatString("0", 32 - cidr);
    
    // Calculate network address (start IP)
    var networkBinary = ipBinary.slice(0, cidr) + repeatString("0", 32 - cidr);
    var networkLong = binaryToLong(networkBinary);
    
    // Calculate broadcast address (end IP)
    var broadcastBinary = ipBinary.slice(0, cidr) + repeatString("1", 32 - cidr);
    var broadcastLong = binaryToLong(broadcastBinary);
    
    // Calculate first usable IP (network address + 2)
    var firstUsableLong = networkLong + 1;
    var firstUsableIp = binaryToIp(longToBinary(firstUsableLong));
    
    // Calculate last usable IP (broadcast address - 1)
    var lastUsableLong = broadcastLong - 1;
    var lastUsableIp = binaryToIp(longToBinary(lastUsableLong));
    
    return {
        firstUsableIp: firstUsableIp,
        lastUsableIp: lastUsableIp
    };
}
