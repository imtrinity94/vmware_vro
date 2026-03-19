/**
 * Scriptable task
 *
 * @param {Array/PS:Host} targetHostsCreated
 */
if(targetHostsCreated != null){
for(var i=0; i < targetHostsCreated.length; i++){
System.getModule("com.purestorage.flasharray.host").removeFlashArrayHost(targetHostsCreated[i]);
}
}