/**
 * Default settings
 *
 * @param {string} address
 * @param {string} name
 * @return {SNMP:SnmpDevice} new_device
 */
new_device = SnmpService.createSnmpDeviceV1V2c(address, name, 0, null, null);
