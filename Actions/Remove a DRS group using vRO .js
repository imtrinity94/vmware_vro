/**
 * @description Removes a named DRS host group from a vSphere cluster by searching for the
 *              group by name and submitting a remove operation via cluster reconfiguration.
 *              Note: groupSpec.removeKey must be set to the name of the group to delete.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:ClusterComputeResource} cluster - The target vSphere cluster.
 * @param {string} vm_group - The name of the DRS host group to remove.
 * @returns {void} Sets `task` to the reconfiguration task object if the group is found.
 */

// The answer is that groupSpec.removeKey needs to be set to the name of the group you wish to delete.

// Search for DRS Group by name
System.log("Looking for Group named '" + vm_group + "'");
for (i in cluster.configurationEx.group) {
    if (cluster.configurationEx.group[i].name == vm_group) {
        if (cluster.configurationEx.group[i] instanceof VcClusterHostGroup) {
            var spec = new VcClusterConfigSpecEx();
            spec.groupSpec = [new VcClusterGroupSpec()];
            spec.groupSpec[0].operation = VcArrayUpdateOperation.remove;
            spec.groupSpec[0].removeKey = cluster.configurationEx.group[i].name; // here
            task = cluster.reconfigureComputeResource_Task(spec, true);
        }
    }
}
