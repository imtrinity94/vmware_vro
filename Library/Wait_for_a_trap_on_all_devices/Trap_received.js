/**
 * Trap received
 *
 * @param {Trigger} trigger
 * @return {Array/Properties} trapData
 */
var snmpResult = SnmpService.retrieveTriggerData(trigger);

var data = System.getModule("com.vmware.library.snmp").processSnmpResult(snmpResult);

trapData = data;

System.log("Enterprise: " + snmpResult.enterprise);
System.getModule("com.vmware.library.snmp").logResult(data);

