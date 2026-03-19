/**
 * Exits maintenance mode for all hosts within a given cluster if they are currently in maintenance mode.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @version 1.0.0
 * @author Mayank Goyal
 * @param {VC:ClusterComputeResource} cluster The cluster to process.
 * @returns {void}
 */
function exitMaintenanceModeCluster(cluster) {
    var hosts = cluster.host;
    if (hosts.length == 0) {
        System.warn("No hosts found in cluster " + cluster.name);
    } else {
        System.log("Found " + hosts.length + " hosts in cluster " + cluster.name);
    }
        
    for (var i in hosts) {
        var host = hosts[i];
        if (host.runtime) {
            if (host.runtime.inMaintenanceMode) {
                System.log("Host " + host.name + " found in maintenance mode. Exiting it...");
                var task = host.exitMaintenanceMode_Task(0);
                System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task, true, 1);
            } else {
                System.warn("Host " + host.name + " is not in maintenance mode. Skipping!");
            }
        } else {
            throw "Critical Error in Host! Runtime attribute not found for " + host.name;
        }
    }
}

// Execute the action (typically actions in vRO return a value or are called as functions)
return exitMaintenanceModeCluster(cluster);
