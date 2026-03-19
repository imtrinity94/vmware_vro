/**
 * Check for VMs on Datastore
 *
 * @param {Array/VC:VirtualMachine} VMs
 */
if(VMs.length > 0)
{
	throw "Datastore can not be restored! There are VMs running on this datastore."
}