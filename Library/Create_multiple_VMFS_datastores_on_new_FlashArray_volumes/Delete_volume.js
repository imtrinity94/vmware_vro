/**
 * Delete volume
 *
 * @param {PS:FlashArrayConnection} flashArrayConnection
 * @param {Array/PS:Volume} volumeCreated
 * @param {Array/VC:Datastore} datastoreCreated
 * @param {boolean} eradicate
 */
if(volumeCreated != null)
{
	if(datastoreCreated != null){
	for(var i = 0; i < volumeCreated.length ; i++){
		for(var j = 0; j < datastoreCreated.length ; j++){
				if(volumeCreated[i].name == datastoreCreated[j].name)
				{
					volumeCreated.splice(i,1);
				}
			}
		}
	}
for each(volume in volumeCreated){
	System.getModule("com.purestorage.flasharray.volume").disconnectDestroyVolume(volume,eradicate) ;
}
}
