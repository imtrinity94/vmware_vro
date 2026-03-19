/**
 * getNameFromVolume
 *
 * @param {PS:Volume} rdmVolume
 * @return {string} rdmVolumeName
 */
//Just get the RDM volume name from volume object. Its required to be passed to the next action.
//To get six-digit Random Number.
while(true){
	var randomNo=Math.floor(Math.random() * 1000000);
 	if(randomNo > 99999 && randomNo < 1000000){
		break;
	}
}
//Add Random number to create volume with new name.
rdmVolumeName = rdmVolume.name + "-" + randomNo;