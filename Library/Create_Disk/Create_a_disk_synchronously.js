/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} host
 * @param {number} capacityInGB
 * @param {string} name
 * @param {string} description
 * @param {VRA:Project} projectInput
 * @param {Array/string} tags
 * @param {boolean} persistent
 * @param {Properties} customProperties
 * @param {Array/string} constraints
 * @param {boolean} encrypted
 * @param {string} sourceReference
 * @param {string} diskContentBase64
 * @param {string} deploymentId
 * @return {VRA:BlockDevice} blockDevice
 */
var diskService = host.createInfrastructureClient().createDiskService();
var blockDeviceSpecs = new VraBlockDeviceSpecification();
blockDeviceSpecs.name = name;
blockDeviceSpecs.description = description;
blockDeviceSpecs.projectId = projectInput.id;
blockDeviceSpecs.capacityInGB = capacityInGB;
blockDeviceSpecs.deploymentId = deploymentId;
blockDeviceSpecs.persistent = persistent;
blockDeviceSpecs.encrypted = encrypted;
blockDeviceSpecs.sourceReference = sourceReference;
blockDeviceSpecs.diskContentBase64 = diskContentBase64;

//Add customProperties
for(var key in customProperties) {
    blockDeviceSpecs.putCustomPropertiesItem(key, customProperties[key]);
}

//Add constraints
for(var index in constraints) {
    var constraintItem = constraints[index];
    var vraConstraint = new VraConstraint();
    vraConstraint.expression = constraintItem;
    vraConstraint.mandatory = true;
    blockDeviceSpecs.addConstraintsItem(vraConstraint);
}


var tagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(tags);

//Converting tags to tag object
var newTags = new Array();
for each(var tagProp in tagPropertiesArray){
         var tag = new VraTag();
         tag.key = tagProp.key;
         tag.value = tagProp.value;
         blockDeviceSpecs.addTagsItem(tag);
}

blockDevice =  diskService.createBlockDevice(blockDeviceSpecs);
if(blockDevice){
    System.log("Block Device request has been successfully completed with block device id " + blockDevice.id);
}
else {
    throw "Error creating block device"
}
