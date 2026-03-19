/**
 * Scriptable task
 *
 * @param {SNMP:SnmpDevice} device
 * @param {string} oid
 * @param {number} number
 * @return {Array/Properties} result
 */
var snmpResult = SnmpService.snmpGetBulk(device, oid, number);
result = System.getModule("com.vmware.library.snmp").processSnmpResult(snmpResult);

System.getModule("com.vmware.library.snmp").logResult(result);