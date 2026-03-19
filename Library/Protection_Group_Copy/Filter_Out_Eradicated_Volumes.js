/**
 * Filter Out Eradicated Volumes
 *
 * @param {Array/PS:Volume} newVolumeList
 * @param {Array/string} eradicateVolumeNames
 * @return {Array/PS:Volume} filteredVolumes
 */
if(!eradicateVolumeNames){
	filteredVolumes = newVolumeList;		
}
else{
for(var i,k = 0; i < newVolumeList.length; i++){
	var found = false;
	for(var j=0; j < eradicateVolumeNames.length; j++){
		if(newVolumeList[i].name == eradicateVolumeNames[j]){
			found = true;
		}	
	}
	if(!found){
	filteredVolumes[k] = newVolumeList[i];
	k++;
	}
}
}