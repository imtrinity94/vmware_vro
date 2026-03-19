/**
 * Check host and VC time
 *
 * @param {boolean} bigDifference
 * @return {boolean} bigDifference
 */
var hosts = VcPlugin.getAllHostSystems();

var instance = new VcManagedObjectReference();
instance.type = "ServiceInstance";
instance.value = "ServiceInstance";

var instanceObject;
var timeVC;
var myHostDateTimeSystem;
var timeHost;
var differenceInMinute;

for each (host in hosts){
	try {
	  instanceObject = VcPlugin.convertToVimManagedObject(host , instance);
	  timeVC = instanceObject.currentTime().getTime();
	  myHostDateTimeSystem = VcPlugin.convertToVimManagedObject(host , host.configManager.dateTimeSystem);
	  timeHost = myHostDateTimeSystem.queryDateTime().getTime();
	} catch (e) {
	  Server.error(e);
	  continue;
	}
	differenceInMinute = (timeHost-timeVC)/60000;
	if(differenceInMinute<0)differenceInMinute = -differenceInMinute;
	if(differenceInMinute>2){
		bigDifference=true;
		break;
	}
}
