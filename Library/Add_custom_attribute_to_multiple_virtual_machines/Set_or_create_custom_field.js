/**
 * Set or create custom field for each virtual machine
 *
 * @param {Array/VC:VirtualMachine} vms
 * @param {string} customAttributeName
 * @param {string} newValue
 */
for (var i = 0; i < vms.length; i++) {
	System.getModule("com.vmware.library.vc.customattribute").setOrCreateCustomField(vms[i], customAttributeName, newValue);
}