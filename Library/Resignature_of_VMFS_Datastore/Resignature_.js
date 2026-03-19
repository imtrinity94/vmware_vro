/**
 * Resignature
 *
 * @param {VC:HostSystem} host - [object Object]
 * @param {string} extntDevicePath
 * @param {Any} hostScsiDisk - [object Object]
 * @param {Any} hostDatastoreSystem
 */
System.log("Vmfs Volume device path: "+extntDevicePath);
//create the resignature spec
var extentDevicePaths= new Array();
extentDevicePaths[0] = extntDevicePath;
var spec = new VcHostUnresolvedVmfsResignatureSpec();
spec.extentDevicePath = extentDevicePaths; 
var task = hostDatastoreSystem.resignatureUnresolvedVmfsVolume_Task(spec);
while(task.info.state.value == "running"){}
System.log("Resignature completed: "+ task.info.state.value);

if(task.info.state.value != "success") {
	throw "Error in Resignature operation";
}
