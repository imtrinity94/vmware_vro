/**
 * Delete VM group
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} vm_group
 * @param {string} errorCode
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

var newVcClusterVmGroup =  System.getModule("com.vmware.library.vc.cluster").getDrsVmGroup(cluster,vm_group);

if (newVcClusterVmGroup!= null) {

//Configuring the Cluster group
var newVcClusterGroupSpec= new Array(); 
System.log("Creating VC Vluster Group spec");
newVcClusterGroupSpec[0] = new VcClusterGroupSpec();
System.log("Initializeing group spec");
newVcClusterGroupSpec[0].operation =  VcArrayUpdateOperation.add;
System.log("Applying add operation to the group spec");
newVcClusterGroupSpec[0].info = newVcClusterVmGroup;
System.log("Removing the found VM group");

//Configuring the spec with the above group
MyVCClusterDRSConfigExSpec.drsConfig = new VcClusterDrsConfigInfo();
MyVCClusterDRSConfigExSpec.groupSpec = newVcClusterGroupSpec;

System.log("Trying to apply remove operaiont");
MyVCClusterDRSConfigExSpec.groupSpec[0].operation =  VcArrayUpdateOperation.remove;
MyVCClusterDRSConfigExSpec.groupSpec[0].removeKey =  vm_group;

System.log("Invoking reconfigurespec");

task = cluster.reconfigureComputeResource_Task(MyVCClusterDRSConfigExSpec , true);
} else {
	System.log(errorCode);
}