/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} vraHost
 * @param {Array/Properties} imageProperties
 * @param {string} imageProfileName
 * @param {string} name
 */
Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script started");

System.log("\n********************************************\n    Setting up "+imageProfileName.toUpperCase()+"   \n********************************************");

var objects = System.getModule("com.vmware.vra.extensibility.plugin.rest.iaas").getImageProfileMappingsCached(vraHost, 60);
var iaasModule = System.getModule("com.vmware.vra.extensibility.plugin.rest.iaas");

// Get imageProfielIDs to update : the ones in the imageProperties different from image name
var imageProfilesIdToUpdate = new Array();
for each (var imageProperty in imageProperties) {
    if (imageProperty.get("name") != name) imageProfilesIdToUpdate.push(imageProperty.get("id"));
    else System.log(imageProperty.get("cloudAccountType") + " " + 
                    imageProperty.get("cloudAccount") + " " + 
                    imageProperty.get("region") + 
                    " is already set with " + name + " image - skipping");
}

// For each image profile

var notFound;
for each (var object in objects)
{
    if (imageProfilesIdToUpdate.indexOf(object.id) >-1) {
        notFound = 0;            
        try {
            var newImageMappingId = iaasModule.getFabricImageIdByCloudAccountIdAndByName(vraHost, object.cloudAccountId, name);
        } catch(e) {
            System.warn(e);
            notFound = 1;
        };

        var updateImageProfileSpec = new Object();
        updateImageProfileSpec.imageMapping = new Object();

        //System.log(JSON.stringify(object));
        for each (var imageMappingName in Object.keys(object.imageMappings.mapping)) {
            updateImageProfileSpec.imageMapping[imageMappingName] = new Object();
            if (imageMappingName == imageProfileName) {
                updateImageProfileSpec.imageMapping[imageMappingName]['id'] = newImageMappingId;
                updateImageProfileSpec.imageMapping[imageMappingName]['name'] = name; 
            }
            else {
                updateImageProfileSpec.imageMapping[imageMappingName]['id'] = object.imageMappings.mapping[imageMappingName]['id'];
                updateImageProfileSpec.imageMapping[imageMappingName]['name'] = object.imageMappings.mapping[imageMappingName]['name'];
            }
            updateImageProfileSpec.imageMapping[imageMappingName]['constraints'] = object.imageMappings.mapping[imageMappingName]['constraints'];
        }

        //PATCH
        if (notFound == 0) System.log("Patching image mapping " + imageProfileName + " (" + object.id + ') with image "' + name + '" (' + newImageMappingId + ')');
        else {
            System.log("Patching image mapping " + imageProfileName + " (" + object.id +  ') with image "Image not found - ' + name + '"');
            delete updateImageProfileSpec.imageMapping[imageProfileName]['id'];
            updateImageProfileSpec.imageMapping[imageProfileName]['name'] = "Image not found - " + name;

        }
        var operation = "PATCH";
        var url = "/iaas/api/image-profiles/" + object.id;
        var content = JSON.stringify(updateImageProfileSpec);
        System.log("PATCH CONTENT :");
        System.log(content)
        try {
            var contentAsString = System.getModule("com.vmware.vra.extensibility.plugin.rest").invokeRestOperation(vraHost, operation, url, content);
            System.log("PATCH RESULT :");
            System.log(contentAsString);
        } catch (e) {
            System.error("Unable to Patch object url : " + url + "\n" + e + "\nWith Content : " + content);
        }
    } 
}

Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script completed");