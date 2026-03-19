/**
 * Simple task with custom script capability.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @return {string} clusterLeader
 * @return {string} current_version
 */

//Declare AVI API Object
var myAviRunTimeInfo = new AviRunTimeInfo() ;
myAviRunTimeInfo.setHttpMethod("GET")
myAviRunTimeInfo.setUrl("cluster/runtime")

//Start Try Catch on Run AVI API. THis will allow us to set a custom Error message on a failure.
try {

    //Run Avi API against the controller
    myAviRunTimeInfo = aviVroClient.callAviAPI(myAviRunTimeInfo)
    var cluster = JSON.parse(myAviRunTimeInfo.getResponseBody())

} catch (e) {

    throw "Please validate the provided Controller is up and run ther Workflow again. No roll backs need to be done at this point. The error received: "+e
    
}


//Loop throw the nodes in the Response Output. Look for the node with Cluster Leader Role, and get MGMT IP Address.
for (node in cluster['node_states']) {

    if (cluster['node_states'][node]['role'] == "CLUSTER_LEADER") {

        //System.log(cluster['node_states'][node]['mgmt_ip'])
        var leader = cluster['node_states'][node]['mgmt_ip']

    }
}

//Set MGMT IP Address to Output variable.
var clusterLeader = leader




//Current Avi Version
var version = (JSON.stringify(cluster['node_info']['version']).split("(")[0]).split('"')[1]

System.log(version)

var current_version = version;