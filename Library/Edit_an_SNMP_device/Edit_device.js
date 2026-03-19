/**
 * Edit device
 *
 * @param {string} address
 * @param {string} name
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {string} community
 * @param {string} version
 * @param {SNMP:SnmpDevice} device
 * @return {SNMP:SnmpDevice} new_device
 */
new_device = SnmpService.editSnmpDevice(device, address, name, port, community, username, password, version);
