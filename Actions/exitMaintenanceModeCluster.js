/**
 * Exits maintenance mode for all hosts within a given cluster if they are currently in maintenance mode.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @version 1.0.0
 * @author Mayank Goyal
 * @param {VC:ClusterComputeResource} vcCluster The cluster to process.
 * @returns {void}
 */

var hostsList = vcCluster.host;
if (!hostsList || hostsList.length === 0) {
    System.warn("No hosts found in cluster: " + vcCluster.name);
} else {
    System.log("Found " + hostsList.length + " hosts in cluster: " + vcCluster.name);
}
    
var i;
for (i = 0; i < hostsList.length; i++) {
    var hostSystem = hostsList[i];
    if (hostSystem.runtime) {
        if (hostSystem.runtime.inMaintenanceMode) {
            System.log("Host " + hostSystem.name + " is in maintenance mode. Attempting to exit...");
            var exitTask = hostSystem.exitMaintenanceMode_Task(0);
            System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(exitTask, true, 1);
        } else {
            System.debug("Host " + hostSystem.name + " is not in maintenance mode. Skipping.");
        }
    } else {
        System.error("Runtime information not available for host: " + hostSystem.name);
    }
}

return null;
