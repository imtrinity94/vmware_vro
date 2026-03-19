/**
 * Scriptable task
 *
 * @param {string} restoreDestination
 * @param {StoreServ:Connection} storageSystem
 * @param {Array/StoreServ:Volume} volume
 * @return {boolean} restoreToParentVolume
 * @return {boolean} restoreToSnapshot
 * @return {boolean} restoreToAnotherVolume
 * @return {Array/string} volumeNamesList
 * @return {string} storageSystemSerialNumber
 */
var volumeNames = [];

if(restoreDestination === 'Snapshot'){
	restoreToSnapshot=true;
}else if(restoreDestination === 'AnotherVolume'){
	restoreToAnotherVolume=true;
}else if(restoreDestination === 'ParentVolume'){
	restoreToParentVolume=true;
}

if(storageSystem != undefined) {
	storageSystemSerialNumber=storageSystem.serialNumber;
}

if(volume != undefined) {
	for(var volumeCount=0; volumeCount < volume.length; volumeCount++ )  {
		volumeNames.push(volume[volumeCount].name);
	}
	volumeNamesList=volumeNames;
}
