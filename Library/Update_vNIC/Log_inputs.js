/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {boolean} updateHostRecord
 * @param {boolean} updateFixedAddress
 * @param {boolean} updateDnsRecords
 * @param {boolean} updateHostname
 * @param {boolean} restartIfNeeded
 * @param {string} resourceId
 * @param {number} vnicIndex
 * @param {string} networkView
 * @param {string} dnsView
 * @param {string} vmName
 * @param {string} ipAddress
 * @param {string} externalAddress
 * @param {string} macAddress
 * @param {boolean} enableDhcp
 */
System.log("Updating IPAM records for vNIC #" + vnicIndex + " ...");

var text = "Got workflow parameters:"

if (ipamConnection == null || ipamConnection == undefined) {
	throw "Connection to IPAM server is not initialized."
}

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\tupdateHostRecord: " + updateHostRecord;
text += "\n\tupdateFixedAddress: " + updateFixedAddress;
text += "\n\tupdateDnsRecords: " + updateDnsRecords;
text += "\n\tupdateHostname: " + updateHostname;

text += "\n\tresourceId: " + resourceId;
text += "\n\tvnicIndex: " + vnicIndex;
text += "\n\tnetworkView: " + networkView;
text += "\n\tdnsView: " + dnsView;

text += "\n\tvmName: " + vmName;
text += "\n\tipAddress: " + ipAddress;
text += "\n\texternalAddress: " + externalAddress;
text += "\n\tmacAddress: " + macAddress;
text += "\n\tenableDhcp: " + enableDhcp;

text += "\n\trestartIfNeeded: " + restartIfNeeded;

System.log(text);