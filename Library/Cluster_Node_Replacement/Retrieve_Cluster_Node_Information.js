/**
 * Simple task with custom script capability.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} sdkVcenter
 * @return {string} vmName_Orig
 * @return {string} vmIP_Orig
 * @return {string} vmMask_Orig
 * @return {string} vmGW_Orig
 * @return {string} clusterNodes_Orig
 * @return {string} cluster_Name
 * @return {string} cluster_VIP
 * @return {string} orig_Datastore
 * @return {string} orig_Network
 * @return {string} orig_ResourcePool
 * @return {string} orig_Cluster
 * @return {string} orig_Datacenter
 * @return {string} orig_vmCPU
 * @return {string} orig_vmRAM
 * @return {string} orig_vmDiskGB
 * @return {string} orig_vmFolder
 */



//Verified failed node

var clusterRuntimeInfo = new AviRunTimeInfo() ;
clusterRuntimeInfo.setHttpMethod("GET")
clusterRuntimeInfo.setUrl("cluster/runtime")
clusterRuntimeInfo = aviVroClient.callAviAPI(clusterRuntimeInfo)
var clusterRuntime = JSON.parse(clusterRuntimeInfo.getResponseBody())

var clusterRuntimeNodes = clusterRuntime['node_states']

var clusterInfo = new AviRunTimeInfo() ;
clusterInfo.setHttpMethod("GET")
clusterInfo.setUrl("cluster")
clusterInfo = aviVroClient.callAviAPI(clusterInfo)
var cluster = JSON.parse(clusterInfo.getResponseBody())

var clusterNodes = cluster['nodes']


var nodeList = [];
var clusterCount = 0

while (clusterCount != 3){
    

    for (var node  in clusterNodes ){

        for (var runtimenode in  clusterRuntimeNodes ) {

            if (clusterNodes[node]['ip']['addr'] == clusterRuntimeNodes[runtimenode]['mgmt_ip']) {

                var nodeArray = {};
                
                nodeArray['ip'] = clusterRuntimeNodes[runtimenode]['mgmt_ip']
                nodeArray['role'] = clusterRuntimeNodes[runtimenode]['role']
                nodeArray['name'] = clusterRuntimeNodes[runtimenode]['name']   
                nodeArray['hostname'] = clusterNodes[node]['vm_hostname']
                nodeArray['state'] = clusterRuntimeNodes[runtimenode]['state']  
                nodeArray['vmID'] = clusterNodes[node]['vm_mor']                  

                nodeList.push(nodeArray)

                clusterNodes.splice(node,1)
                clusterRuntimeNodes.splice(runtimenode,1)


                clusterCount = clusterCount+1



                                    
            }
        }

    }

}

var node_VMID = " "
for (var nodes in nodeList){

    if (nodeList[nodes]['state'] == "CLUSTER_INACTIVE") {

        node_VMID = nodeList[nodes]['vmID']
        //nodeList.splice(nodes,1)

    }
}

if (node_VMID == " "){
    throw "All of the nodes in this cluster are UP and ACTIVE. There is nothing to do... Ending Workflow."
}

System.log(node_VMID)

// Set the vCenter connection
var connections = VcPlugin.allSdkConnections;
for (var connection in connections) {
    var sdkName = connections[connection].name;
    if (sdkName.indexOf(sdkVcenter) >= 0) {
        var sdkConnection = connections[connection]

    }
}


var allVMObj = sdkConnection.getAllVirtualMachines()

for (var vm in allVMObj){

    if (allVMObj[vm].id == node_VMID){

        VMObj = allVMObj[vm]
    }

}



System.log(VMObj.name)

if(VMObj.runtime.powerState.name == "poweredOn") {

    VMObj.powerOffVM_Task();
    var newName = VMObj.name + "-Old"
    VMObj.rename_Task(newName);

}else{

    var newName = VMObj.name + "-Old"
    VMObj.rename_Task(newName);
}

  
//Retrieve vAPP properties and store in array
var vapp_prop = VMObj.config.vAppConfig.property

var properties = new Array()
for (prop in vapp_prop){

    properties.push(vapp_prop[prop])

}

//--------------------------------



for (property in properties){
      /// Update subnet mask property
    if(properties[property].id == "mgmt-ip"){
        var mgmtIP = properties[property].value

  
    }
    /// Update subnet mask property
    else if (properties[property].id == "mgmt-mask"){
        var mgmtMask = properties[property].value

       
    }
      /// Update gateway property
    else if (properties[property].id == "default-gw"){
        var mgmtGW = properties[property].value
       
    }


}






//Retreive environment information
vmName_Orig = VMObj.name
vmIP_Orig = mgmtIP
vmMask_Orig = mgmtMask
vmGW_Orig = mgmtGW
clusterNodes_Orig = nodeList
cluster_Name = cluster['name']
cluster_VIP = cluster['virtual_ip']['addr']
orig_Datastore = VMObj.datastore[0].name
orig_Network = (VMObj.network[0].name).split(" ")[0]
orig_ResourcePool = VMObj.resourcePool.name
orig_Cluster = VMObj.runtime.host.parent.name


var allDCObj = sdkConnection.getAllDatacenters()
var foundCluster = false


while (foundCluster != true){

    for (DC in allDCObj) {
        for (CL in allDCObj[DC].hostFolder.childEntity){
            if(allDCObj[DC].hostFolder.childEntity[CL].name == orig_Cluster){
                orig_Datacenter = allDCObj[DC].name
                foundCluster = true
            }
        }
    }

}

orig_vmCPU = VMObj.config.hardware.numCPU
orig_vmRAM = VMObj.config.hardware.memoryMB
var vmDevices = VMObj.config.hardware.device

orig_vmDiskGB = 0;
var size = new Array();
var h = 0;

for (var i in vmDevices) {

    if (vmDevices[i] instanceof VcVirtualDisk) {

        size[h++] = vmDevices[i].capacityInKB / 1024 / 1024;

        orig_vmDiskGB += vmDevices[i].capacityInKB / 1024 / 1024;   

}

}

var parent = VMObj.parent;
if (parent instanceof VcVmFolder && parent.name != "vm") {
	orig_vmFolder = parent;
}else{
   orig_vmFolder = " "
}