/**
 * V3 device
 *
 * @param {string} address
 * @param {string} name
 * @param {boolean} advanced
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @return {SNMP:SnmpDevice} new_device
 */
new_device = SnmpService.createSnmpDeviceV3(address, name, port, username, password);
