/**
 * Initialize trap
 *
 * @param {SNMP:SnmpDevice} device
 * @param {string} oid
 * @return {Trigger} trigger
 */
trigger = SnmpService.createTrigger(device, oid);