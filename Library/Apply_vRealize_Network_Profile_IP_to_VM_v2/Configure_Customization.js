/**
 * Configure Customization
 *
 * @param {VC:VirtualMachine} vm
 * @param {string} gateway
 * @param {string} ipAddress
 * @param {string} subnetMask
 * @param {string} vm_customization
 * @return {VC:Task} task
 */
System.debug("BEGIN: Configure Customization");
//create the custSpec objects  
var cloneSpec = new VcCustomizationSpec();
var csm = vm.sdkConnection.customizationSpecManager.getCustomizationSpec(vm_customization)

var cloneSpec = csm.spec
cloneSpec.nicSettingMap = new Array( new VcCustomizationAdapterMapping() ); 

ipSettings = new VcCustomizationIPSettings();
ipSettings.gateway = new Array( gateway );  

var staticIP = new VcCustomizationFixedIp()
staticIP.ipAddress = ipAddress
ipSettings.ip = staticIP

ipSettings.subnetMask = subnetMask;

cloneSpec.nicSettingMap[0].adapter = ipSettings 

System.log("Applying VM Customization Specification");
var task = vm.customizeVM_Task(cloneSpec);
System.log("Finished applying VM Customization Specification");
System.debug("END: Configure Customization");