/**
 * Set or create custom field for each virtual machine
 *
 * @param {string} customAttributeName
 * @param {string} newValue
 * @param {VC:VirtualMachine} vm
 */
System.getModule("com.vmware.library.vc.customattribute").setOrCreateCustomField(vm, customAttributeName, newValue);
