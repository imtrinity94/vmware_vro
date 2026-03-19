/**
 * Get VM properties
 *
 * @param {vCAC:VirtualMachine} vCACVm
 * @param {Properties} vCACVmProperties
 * @return {boolean} attrCreateHostRecord
 * @return {boolean} attrCreateAddressRecord
 * @return {boolean} attrCreateAddressAndPtrRecords
 * @return {boolean} attrCreateFixedAddress
 * @return {boolean} attrCreateReservation
 * @return {boolean} attrEnableCustomHostname
 * @return {string} attrConditionalPropertyName0
 * @return {string} attrConditionalPropertyName1
 * @return {string} attrConditionalPropertyName2
 * @return {string} attrConditionalPropertyValue0
 * @return {string} attrConditionalPropertyValue1
 * @return {string} attrConditionalPropertyValue2
 * @return {boolean} attrRestartIfNeeded
 * @return {string} attrResourceId
 * @return {string} attrVmName
 */
attrCreateHostRecord = getBooleanValue("Infoblox.IPAM.createHostRecord");
attrCreateAddressRecord = getBooleanValue("Infoblox.IPAM.createAddressRecord");
attrCreateAddressAndPtrRecords = getBooleanValue("Infoblox.IPAM.createAddressAndPtrRecords");
attrCreateFixedAddress = getBooleanValue("Infoblox.IPAM.createFixedAddress");
attrCreateReservation = getBooleanValue("Infoblox.IPAM.createReservation");
attrEnableCustomHostname = getBooleanValue("Infoblox.IPAM.enableCustomHostname");
attrRestartIfNeeded = getBooleanValue("Infoblox.IPAM.restartIfNeeded");

attrConditionalPropertyName0 = vCACVmProperties.get("Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty0.Name");
attrConditionalPropertyName1 = vCACVmProperties.get("Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty1.Name");
attrConditionalPropertyName2 = vCACVmProperties.get("Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty2.Name");
attrConditionalPropertyValue0 = vCACVmProperties.get("Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty0.Value");
attrConditionalPropertyValue1 = vCACVmProperties.get("Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty1.Value");
attrConditionalPropertyValue2 = vCACVmProperties.get("Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty2.Value");

attrResourceId = vCACVm.virtualMachineID;
attrVmName = vCACVm.virtualMachineName;

function getBooleanValue(key) {
	var value = vCACVmProperties.get(key);
    if (value) {
    	switch (value.toLowerCase()) {
        	case "true":
				return true;
            case "false":
				return false;
			default:
				throw "Error updating MAC address(es) because custom property  \"" + key + "\" has invalid value \"" + value + "\", code: 1010";
        }
    }
    return false;
}
