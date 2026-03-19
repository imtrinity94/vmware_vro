/**
 * Scriptable task
 *
 * @param {SNMP:SnmpDevice} device
 * @param {string} oid
 * @return {Array/Properties} result
 */
var snmpResult = SnmpService.snmpGetNext(device, oid);
result = System.getModule("com.vmware.library.snmp").processSnmpResult(snmpResult);

System.getModule("com.vmware.library.snmp").logResult(result);