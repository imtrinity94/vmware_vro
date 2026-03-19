/**
 * V1/V2 device
 *
 * @param {string} address
 * @param {string} name
 * @param {number} port
 * @param {string} community
 * @param {string} version
 * @return {SNMP:SnmpDevice} new_device
 */
new_device = SnmpService.createSnmpDeviceV1V2c(address, name, port, community, version);
