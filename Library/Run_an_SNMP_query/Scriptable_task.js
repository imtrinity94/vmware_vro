/**
 * Scriptable task
 *
 * @param {SNMP:SnmpQuery} query
 * @return {Array/Properties} result
 */
var snmpResult = SnmpService.runQuery(query);
result = System.getModule("com.vmware.library.snmp").processSnmpResult(snmpResult);

System.getModule("com.vmware.library.snmp").logResult(result);