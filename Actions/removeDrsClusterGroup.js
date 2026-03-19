/**
 * @description Removes a named DRS host group from a vSphere cluster by searching for the
 *              group by name and submitting a remove operation via cluster reconfiguration.
 *              Note: groupSpec.removeKey must be set to the name of the group to delete.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VC:ClusterComputeResource} vcCluster - The target vSphere cluster.
 * @param {string} targetDrsGroupName - The name of the DRS host group to remove.
 * @returns {void}
 */

if (!targetDrsGroupName) {
    System.warn("No DRS Group name provided for removal.");
    return null;
}

System.log("Searching for DRS Group '" + targetDrsGroupName + "' on cluster: " + vcCluster.name);

var clusterGroupsList = vcCluster.configurationEx.group;
var i;
for (i = 0; i < clusterGroupsList.length; i++) {
    var currentGroup = clusterGroupsList[i];
    
    if (currentGroup.name === targetDrsGroupName) {
        if (currentGroup instanceof VcClusterHostGroup) {
            System.log("Matched DRS Host Group. Preparing removal reconfiguration...");
            
            var clusterConfigSpec = new VcClusterConfigSpecEx();
            var updateSpec = new VcClusterGroupSpec();
            
            updateSpec.operation = VcArrayUpdateOperation.remove;
            updateSpec.removeKey = currentGroup.name; 
            
            clusterConfigSpec.groupSpec = [updateSpec];
            
            System.log("Submitting reconfiguration task to delete group '" + targetDrsGroupName + "'.");
            var reconfigTask = vcCluster.reconfigureComputeResource_Task(clusterConfigSpec, true);
            
            if (reconfigTask) {
                System.debug("Reconfiguration task created successfully: " + reconfigTask.id);
            }
            break; // Found and processing target group
        } else {
            System.debug("Found group '" + targetDrsGroupName + "' but it is not a Host Group. Skipping.");
        }
    }
}

return null;
