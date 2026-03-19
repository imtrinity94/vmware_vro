/**
 * Log the input text to the console log with level 'log'
 *
 * @param {number} attrCurrentIndex
 * @param {string} attrIpAddress
 * @param {string} attrExternalAddress
 * @param {string} attrMacAddress
 * @param {boolean} attrEnableDhcp
 */
var text = "Got vNIC #" + attrCurrentIndex + "  properties:";
text += "\n\tipAddress: " + attrIpAddress;
text += "\n\texternalAddress: " + attrExternalAddress;
text += "\n\tmacAddress: " + attrMacAddress;
text += "\n\tenableDhcp: " + attrEnableDhcp;

System.log(text);
