//the answer is that groupSpec.removeKey needs to be set to the name of the group you wish to delete.

// Search for DRS Group by name
System.log("Looking for Group named '" + vm_group + "'");
for (i in cluster.configurationEx.group) {
    if (cluster.configurationEx.group[i].name == vm_group) {
        if (cluster.configurationEx.group[i] instanceof VcClusterHostGroup) {
            var spec = new VcClusterConfigSpecEx();
            spec.groupSpec = [new VcClusterGroupSpec()];
            spec.groupSpec[0].operation = VcArrayUpdateOperation.remove;
            spec.groupSpec[0].removeKey = cluster.configurationEx.group[i].name;  //here
            task = cluster.reconfigureComputeResource_Task(spec, true);
        }
    }
}
