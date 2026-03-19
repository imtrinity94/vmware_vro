/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} host
 * @param {string} name
 * @param {string} hostName
 * @param {boolean} acceptSelfSignedCertificate
 * @param {Array/string} regionIds
 * @param {boolean} createDefaultZones
 * @param {string} hostType
 * @param {VRA:CloudAccountNsxT} nsxt
 * @param {VRA:CloudAccountNsxV} nsxv
 * @param {string} dcid
 * @param {string} description
 * @param {string} username
 * @param {SecureString} password
 * @param {string} id
 * @param {VRA:CloudAccountVsphere} vSphereCloudAccount
 * @param {string} existingNsxManagerId
 * @param {Array/string} newCapabilityTags
 * @return {VRA:RequestTracker} requestTracker
 */
var body = new VraUpdateCloudAccountVsphereSpecification();
body.name = name;
body.hostName = vSphereCloudAccount.hostName;
body.description = description;
body.username=username;
body.password =password;
body.createDefaultZones = createDefaultZones;
var regionArry = [];
var regionObj = new VraRegionSpecification();
for (regionIndex in regionIds) {
    regionObj.externalRegionId=regionIds[regionIndex].split(",")[0];
    regionObj.name=regionIds[regionIndex].split(",")[1];;
    regionArry[regionIndex] = regionObj;
}
body.regions= regionArry;

var newTags = new Array();
var newTagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(newCapabilityTags);
//Adding oldTags to tags array
if(null != vSphereCloudAccount.tagsExtension){
    var tagsProps = JSON.parse(vSphereCloudAccount.tagsExtension);
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

body.tags = newTags;

//associated cloud accounts
var associatedCloudAccIds = System.getModule("com.vmware.library.vra.infrastructure.util").getAssociatedCloudAccountIds(nsxt,nsxv);
body.associatedCloudAccountIds=associatedCloudAccIds;

var client = host.createInfrastructureClient().createCloudAccountService();
requestTracker = client.updateVSphereCloudAccountAsync(vSphereCloudAccount , body);
if(!requestTracker  || !(requestTracker.id)){
    throw "vSphere Cloud Account Update operation failed. Please check the system logs for more details."
}
System.log("vSphere Cloud account update operation has been requested successfully.");

function addTagObject(tagsArray, key, value) {
    var tag = new VraTag();
    tag.key = key;
    tag.value = value;
    tagsArray.push(tag);
    return tagsArray;
}