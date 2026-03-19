/**
 * @description Creates an SNMP v1/v2c device definition in vRO pointing to a vCenter Server.
 *              Uses hardcoded values as a demonstration template.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @returns {void}
 */

var deviceAddress = "vCenterServer.domain.local";
var deviceName = "vCenter Server";
var devicePort = 4000;
var communityString = "public";
var snmpVersion = "V2C";

var snmpDevice = SnmpService.createSnmpDeviceV1V2c(deviceAddress, deviceName, devicePort, communityString, snmpVersion);

System.log("SNMP Device '" + deviceName + "' created for " + deviceAddress);

return null;
