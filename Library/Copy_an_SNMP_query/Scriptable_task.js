/**
 * Scriptable task
 *
 * @param {SNMP:SnmpQuery} query
 * @param {SNMP:SnmpDevice} targetDevice
 * @return {SNMP:SnmpQuery} outQuery
 */
outQuery = System.getModule("com.vmware.library.snmp").createSnmpQuery(targetDevice,query.type,query.oid,query.name);