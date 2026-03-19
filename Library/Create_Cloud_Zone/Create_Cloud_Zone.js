/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} host
 * @param {string} description
 * @param {string} name
 * @param {VRA:Region} region
 * @param {string} placementPolicy
 * @param {Array/string} newCapabilityTags
 * @param {boolean} hostRegionCheck
 * @return {VRA:Zone} zone
 */
if(!hostRegionCheck){
    throw "Please select the correct host's region";
}
var zoneSpecfication = new VraZoneSpecification();
zoneSpecfication.name = name;
zoneSpecfication.description = description;
zoneSpecfication.placementPolicy = placementPolicy;
zoneSpecfication.regionId = region.id;

var newTagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(newCapabilityTags);
//Converting newTagPropertiesArray to tag object
var newTags = new Array();
for each(var tagProp in newTagPropertiesArray){
    var tag = new VraTag();
    tag.key = tagProp.key;
    tag.value = tagProp.value; 
    newTags.push(tag);
}
zoneSpecfication.tags = newTags;

var iaasClient = host.createInfrastructureClient();
var cloudZoneApiClient = iaasClient.createCloudZoneService();
zone = cloudZoneApiClient.createZone(zoneSpecfication);

if (!zone && !zone.id && !zone.name) {
    throw "Cloud Zone Create operation failed. Please check the system logs for more details."
}
System.log("Cloud zone " + name + " created successfully!");


