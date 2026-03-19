/**
 * removeVolumeFromFAProtectionGroup
 *
 * @param {PS:Volume} volume
 * @param {PS:ProtectionGroup} protectionGroup - [object Object]
 * @return {PS:Volume} removedVolume
 * @return {PS:ProtectionGroup} updatedProtectionGroup
 */
System.debug("Input parameters to script are:" + " Protection Group :" + protectionGroup + ", FlashArray Volume:" + volume);

var protectionGroupRequest = new PSProtectionGroupRequest();
var remVolume = new Array();
remVolume.push(volume.name);
protectionGroupRequest.remvollist = remVolume;

System.log("Volume Name: " + volume.name + " to be removed from flasharray protection group: " + protectionGroup.name);
var result = protectionGroup.update(protectionGroupRequest);
System.debug("Volume : " +  volume + " removed from the FlashArray Protection Group: " + protectionGroup);
System.log("Volume Name: " +  volume.name  + " removed from the FlashArray Protection Group: " + protectionGroup.name);

removedVolume = volume;
updatedProtectionGroup = PSProtectionGroupManager.getProtectionGroup(result.name, protectionGroup.getSession());
System.debug("Protection group after removing volume: " + updatedProtectionGroup);

