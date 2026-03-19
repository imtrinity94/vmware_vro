/**
 * Simple task with custom script capability.
 *
 * @param {SecureString} password
 * @param {VRA:Host} host
 * @param {string} name
 * @param {string} hostName
 * @param {boolean} acceptSelfSignedCertificate
 * @param {Array/string} regionIds
 * @param {boolean} createDefaultZones
 * @param {string} hostType
 * @param {VRA:CloudAccountNsxT} nsxt
 * @param {VRA:CloudAccountNsxV} nsxv
 * @param {VRA:DataCollector} cloudproxy
 * @param {string} dcid
 * @param {string} nsxManagerId
 * @param {string} description
 * @param {string} username
 * @param {Array/string} newCapabilityTags
 * @return {VRA:CloudAccountVsphere} vsphereCloudAccount
 */
var body = new VraCloudAccountVsphereSpecification();
body.name = name;
body.description = description;
body.hostName = hostName;
body.acceptSelfSignedCertificate=acceptSelfSignedCertificate;
body.username=username;
body.password =password;
body.createDefaultZones = createDefaultZones;
var regionObj = new VraRegionSpecification();
var regionArry = [];
for (regionIndex in regionIds) {
    regionObj.externalRegionId=regionIds[regionIndex].split(",")[0];;
    regionObj.name=regionIds[regionIndex].split(",")[1];;
    regionArry[regionIndex] = regionObj;
}

body.regions= regionArry;
body.dcid=dcid;
if(nsxt  && nsxt.id)
{
    nsxManagerId = nsxt.id;
}
if(nsxv && nsxv.id)
{ 
     nsxManagerId = nsxv.id;
}
if(nsxManagerId){
    var ids = new Array();
    ids.push(nsxManagerId);
    body.associatedCloudAccountIds=ids;
}

var newTagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(newCapabilityTags);
//Converting newTagPropertiesArray to tag object
var newTags = new Array();
for each(var tagProp in newTagPropertiesArray){
    var tag = new VraTag();
    tag.key = tagProp.key;
    tag.value = tagProp.value; 
    newTags.push(tag);
}

body.tags = newTags;


var client = host.createInfrastructureClient().createCloudAccountService();
vsphereCloudAccount = client.createVSphereCloudAccount(body);

if(!vsphereCloudAccount  || !(vsphereCloudAccount.id || !vsphereCloudAccount.name )){
    throw "vSphere Cloud Account Create operation failed. Please check the system logs for more details."
}
System.log("vSphere Cloud account " + vsphereCloudAccount.name + " created successfully!");
