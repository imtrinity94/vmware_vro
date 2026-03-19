/**
 * Configuring Cluster VM group
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/VC:VirtualMachine} vms
 * @param {string} vm_group
 * @return {VC:Task} task
 */
// ------- ReconfigureCluster_Task -------
System.log("Creating reconfigure specification");
//Creating editing spec
var MyVCClusterDRSConfigExSpec = new VcClusterConfigSpecEx() ;

System.log("Creating VC Cluster VMGroup");

//Configuring VM group

//------------Finding Existing VM Group------------
System.log ("Finding VM group");
var existingClusterVmGroup = new VcClusterVmGroup();

existingClusterVmGroup =  System.getModule("com.vmware.library.vc.cluster").getDrsVmGroup(cluster,vm_group);
var newVcClusterVmGroup = existingClusterVmGroup;

if (existingClusterVmGroup.vm!= null) {

//Copying current VMs to the new group
var groupArray = new Array ();
if (vms != null) {

for (var i=0; i<newVcClusterVmGroup.vm.length  ; i++) {
for (var j=0; j< vms.length ; j++) {
    if (newVcClusterVmGroup.vm[i] != vms[j]) {
	groupArray.push(newVcClusterVmGroup.vm[i]);
	}
}
}
}
newVcClusterVmGroup.vm = groupArray;
System.log ("New current VM group contains " + newVcClusterVmGroup.vm.length + "vms");
} else {
System.log ("Adding first Vms to the group");
newVcClusterVmGroup.name = vm_group;

if (vms != null) {
System.log("Adding VM array to VMGRoup");
newVcClusterVmGroup.vm = vms;
}
}
//Configuring the Cluster group
var newVcClusterGroupSpec= new Array(); 
System.log("Creating VC Vluster Group spec");
newVcClusterGroupSpec[0] = new VcClusterGroupSpec();
System.log("Initializeing group spec");
newVcClusterGroupSpec[0].operation =  VcArrayUpdateOperation.add;
System.log("Applying add operation to the group spec");
newVcClusterGroupSpec[0].info = newVcClusterVmGroup;
System.log("Seeting info of the VC cluster group equal to the VMGroup");

//Configuring the spec with the above group
MyVCClusterDRSConfigExSpec.drsConfig = new VcClusterDrsConfigInfo();
MyVCClusterDRSConfigExSpec.drsConfig.enabled = true;
System.log("Setting DRS Enabled for the clusterSpecEx");
MyVCClusterDRSConfigExSpec.groupSpec = newVcClusterGroupSpec;

System.log("Trying to apply add operaiont");
MyVCClusterDRSConfigExSpec.groupSpec[0].operation =  VcArrayUpdateOperation.edit;

System.log("Invoking reconfigurespec");

task = cluster.reconfigureComputeResource_Task(MyVCClusterDRSConfigExSpec , true);
