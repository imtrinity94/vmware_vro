/**
 * Scriptable task
 *
 * @param {SNMP:SnmpQuery} query
 * @param {string} type
 * @param {string} oid
 * @param {string} name
 * @return {SNMP:SnmpQuery} outQuery
 */
outQuery = SnmpService.updateQuery(query, type, oid, name);