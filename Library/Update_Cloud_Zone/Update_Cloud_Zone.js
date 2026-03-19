/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} host
 * @param {string} description
 * @param {string} placementPolicy
 * @param {string} name
 * @param {VRA:Zone} zone
 * @param {Array/string} newCapabilityTags
 * @return {VRA:Zone} updatedZone
 */
var zoneSpecfication = new VraZoneSpecification();
zoneSpecfication.name = name;
zoneSpecfication.description = description;
zoneSpecfication.placementPolicy = placementPolicy;
var region = VraEntitiesFinder.getCloudZoneRegionByZone(host, zone);
if(null == region){
    throw "Please select zone from the same host";
}
zoneSpecfication.regionId = region.id;

var newTagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(newCapabilityTags);

//Adding oldTags to tags array
var newTags = new Array();
if(null != zone.tagsExtension){
    var tagsProps = JSON.parse(zone.tagsExtension);
    if(null != tagsProps){
        Object.keys(tagsProps).forEach(function(key) {
        addTagObject(newTags, tagsProps[key].key, tagsProps[key].value);
        });
    }
}
//Adding newTagPropertiesArray to tags array
for each(var tagProp in newTagPropertiesArray){
    addTagObject(newTags, tagProp.key, tagProp.value);
}

zoneSpecfication.tags = newTags;

var iaasClient = host.createInfrastructureClient();
var cloudZoneService = iaasClient.createCloudZoneService();
updatedZone = cloudZoneService.updateZone(zone.id, zoneSpecfication);
if (!updatedZone && !updatedZone.id && !updatedZone.name) {
    throw "Cloud Zone Update operation failed. Please check the system logs for more details."
}
System.log("Cloud zone " + updatedZone.name + " updated successfully!");

function addTagObject(tagsArray, key, value) {
    var tag = new VraTag();
    tag.key = key;
    tag.value = value;
    tagsArray.push(tag);
    return tagsArray;
}