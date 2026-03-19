/**
 * remove nic
 *
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} myTask
 */
var nicsToRemove = [];

for each (var device in vm.config.hardware.device) {  
  if (device instanceof VcVirtualVmxnet  
   || device instanceof VcVirtualVmxnet2  
   || device instanceof VcVirtualVmxnet3
   || device instanceof VcVirtualE1000  
   || device instanceof VcVirtualPCNet32  
   || device instanceof VcVirtualEthernetCard) {
      nicsToRemove.push(device);  
  }
}  

var vmConfigSpec = new VcVirtualMachineConfigSpec();  
var deviceChanges = [];
var deviceConfigSpec = new VcVirtualDeviceConfigSpec() ;  

for each (var nic in nicsToRemove) {  
  deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.remove;  
  deviceConfigSpec.device = nic;  
  
  deviceChanges.push(deviceConfigSpec);  
}  
  
vmConfigSpec.deviceChange = deviceChanges;  
  
try {  
  myTask = vm.reconfigVM_Task(vmConfigSpec);  
} catch (ex) {  
  System.warn("Error while reconfiguring VM: " + ex);  
}  