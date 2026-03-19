/**
 * Adding VM Group
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/VC:VirtualMachine} vms
 * @param {string} group_name
 * @return {VC:Task} task
 */
// Configuring new cluster specification
var MyVCClusterDRSConfigExSpec = new VcClusterConfigSpecEx() ;
System.log("Creating VC Cluster VMGroup");

//Configuring VM group
var myVcClusterVmGroup = new VcClusterVmGroup();
myVcClusterVmGroup.name = group_name;
System.log ("Adding VMs to group");
if (vms!=null ){
myVcClusterVmGroup.vm = vms;
}


//Configuring the group specificaton

var MyVcClusterGroupSpec= new Array(); 

System.log("Creating VC Cluster Group specification");
MyVcClusterGroupSpec[0] = new VcClusterGroupSpec();
System.log("Initializeing group spec");
MyVcClusterGroupSpec[0].operation =  VcArrayUpdateOperation.add;
System.log("Applying add operation to the group spec");
MyVcClusterGroupSpec[0].info = myVcClusterVmGroup;
System.log("Seeting info of the VC cluster group equal to the VMGroup");

//Configuring the cluster specification using the defined group specificaiton

MyVCClusterDRSConfigExSpec.drsConfig = new VcClusterDrsConfigInfo();
MyVCClusterDRSConfigExSpec.drsConfig.enabled = true;
System.log("Setting DRS Enabled for the clusterSpecEx");
MyVCClusterDRSConfigExSpec.groupSpec = MyVcClusterGroupSpec;

System.log("Trying to assigning the previously created Group spec to the ClusterSpecEx");

MyVCClusterDRSConfigExSpec.groupSpec[0].operation =  VcArrayUpdateOperation.add;

System.log("Invoking reconfigurespec");

task = cluster.reconfigureComputeResource_Task(MyVCClusterDRSConfigExSpec , true);
System.log("Processing reconfiguration");
