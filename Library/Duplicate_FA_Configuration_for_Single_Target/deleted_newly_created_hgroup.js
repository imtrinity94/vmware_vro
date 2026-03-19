/**
 * deleted newly created hgroup
 *
 * @param {Array/PS:HostGroup} targetHgroupsCreated
 */
if(targetHgroupsCreated != null){
for(var i=0; i < targetHgroupsCreated.length; i++){
System.getModule("com.purestorage.flasharray.hostgroup").removeFlashArrayHostGroup(targetHgroupsCreated[i]);
}
}