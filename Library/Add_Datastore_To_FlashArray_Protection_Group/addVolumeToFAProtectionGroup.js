/**
 * addVolumeToFAProtectionGroup
 *
 * @param {PS:Volume} volume
 * @param {PS:ProtectionGroup} protectionGroup
 * @return {PS:Volume} addedVolume - [object Object]
 * @return {PS:ProtectionGroup} updatedProtectionGroup
 */
System.debug("Input parameters to script are:" + " Protection Group :" + protectionGroup + ", FlashArray Volume:" + volume);

var protectionGroupRequest = new PSProtectionGroupRequest();
var addVolume = new Array();
addVolume.push(volume.name);
protectionGroupRequest.addvollist = addVolume;

System.log("Volume Name: " + volume.name + " to be added in flasharray protection group: " + protectionGroup.name);

var result = protectionGroup.update(protectionGroupRequest);
System.debug("Volume : " +  volume + " added to FlashArray Protection Group: " + protectionGroup);
System.log("Volume Name: " +  volume.name  + " added to FlashArray Protection Group: " + protectionGroup.name);

addedVolume = volume;
updatedProtectionGroup = PSProtectionGroupManager.getProtectionGroup(result.name , protectionGroup.getSession());
System.debug("Protection group with added volume: " + updatedProtectionGroup);
