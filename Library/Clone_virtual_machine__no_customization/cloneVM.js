/**
 * Creates a clone of this virtual machine. If the virtual machine is used as a template, this method corresponds to the deploy command. 
Any % (percent) character used in this name parameter must be escaped, unless it is used to start an escape sequence. Clients may also escape any other characters in this name parameter. 
The privilege required on the source virtual machine depends on the source and destination types: 
	- source is virtual machine, destination is virtual machine - VirtualMachine.Provisioning.Clone 
	- source is virtual machine, destination is template - VirtualMachine.Provisioning.CreateTemplateFromVM
	- source is template, destination is virtual machine - VirtualMachine.Provisioning.DeployTemplate 
	- source is template, destination is template - VirtualMachine.Provisioning.CloneTemplate 
If customization is requested in the CloneSpec, then the VirtualMachine.Provisioning.Customize privilege must also be held on the source virtual machine.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {VC:VmFolder} vmFolder - [object Object]
 * @param {string} name - [object Object]
 * @param {boolean} powerOn - [object Object]
 * @param {boolean} template - [object Object]
 * @param {VC:Datastore} datastore - [object Object]
 * @param {VC:HostSystem} host - [object Object]
 * @param {VC:ResourcePool} pool - [object Object]
 * @param {boolean} thinProvision - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.basic").cloneVM(vm,vmFolder,name,powerOn,template,datastore,host,pool,thinProvision) ;