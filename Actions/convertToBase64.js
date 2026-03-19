/**
 * @description Encodes an input string to Base64 using UTF-8 byte encoding.
 *              The output is split into 76-character lines with CRLF line endings,
 *              conforming to the MIME Base64 standard.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string} inputText - The plain text string to encode.
 * @param {string} base64Alphabet - The Base64 character alphabet string (64 characters).
 * @returns {void}
 */

var encodedBuffer = "";
var inputBytes;

try {
    inputBytes = inputText.getBytes("UTF-8");
} catch (e) {
    inputBytes = inputText.getBytes();
}

var paddingRequired = (3 - (inputBytes.length % 3)) % 3;
var paddedBytes = new Byte[inputBytes.length + paddingRequired];

System.arraycopy(inputBytes, 0, paddedBytes, 0, inputBytes.length);

var i;
for (i = 0; i < inputBytes.length; i += 3) {
    var chunk = ((paddedBytes[i] & 0xff) << 16) + ((paddedBytes[i + 1] & 0xff) << 8) + (paddedBytes[i + 2] & 0xff);

    encodedBuffer = encodedBuffer +
        base64Alphabet.charAt((chunk >> 18) & 0x3f) +
        base64Alphabet.charAt((chunk >> 12) & 0x3f) +
        base64Alphabet.charAt((chunk >> 6) & 0x3f) +
        base64Alphabet.charAt(chunk & 0x3f);
}

var base64String = encodedBuffer.substring(0, encodedBuffer.length - paddingRequired) + "==".substring(0, paddingRequired);
var wrappedLines = "";

var j;
for (j = 0; j < base64String.length; j += 76) {
    wrappedLines += base64String.substring(j, Math.min(base64String.length, j + 76));
    wrappedLines += "\r\n";
}

// Result is typically stored in a workflow variable 'strLines'
System.log("Encoded Base64 length: " + wrappedLines.length);

return null;
