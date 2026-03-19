/**
 * Connect Volumes to HostGroups
 *
 * @param {PS:Volume} faVolumeObject
 * @param {Properties} hostGroups
 * @param {PS:FlashArrayConnection} flashArrayConnection
 */
 for each (hgroup in hostGroups.keys){
		var hgroupObj = System.getModule("com.purestorage.flasharray.hostgroup").getSpecificFlashArrayHostGroup(hgroup,flashArrayConnection);
		System.getModule("com.purestorage.flasharray.hostgroup").connectVolumeToHostGroup(faVolumeObject,hgroupObj,flashArrayConnection) ;
		System.debug(faVolumeObject.Name +" volume connected to host group: " + hgroup);

	 }
System.log(faVolumeObject.Name +" volume connected");	
