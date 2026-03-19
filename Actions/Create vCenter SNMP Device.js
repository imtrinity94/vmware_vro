/**
 * @description Creates an SNMP v1/v2c device definition in vRO pointing to a vCenter Server.
 *              Uses hardcoded values as a demonstration template.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

var strAddress = "vCenterServer.domain.local";

var strName = "vCenter Server";

var intPort = 4000;

var strCommunity = "public";

var strVersion = "V2C";

var objSNMPSnmpDevice = SnmpService.createSnmpDeviceV1V2c(strAddress, strName, intPort, strCommunity, strVersion);
