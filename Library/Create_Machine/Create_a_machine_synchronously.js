/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} host
 * @param {string} name
 * @param {string} description
 * @param {string} image
 * @param {string} imageRef
 * @param {string} flavor
 * @param {string} flavorRef
 * @param {number} machineCount
 * @param {Array/string} constraints
 * @param {Array/string} tags
 * @param {Properties} customProperties
 * @param {string} authentication
 * @param {string} keyPair
 * @param {string} machineBootConfig
 * @param {SecureString} password
 * @param {boolean} phoneHomeFailOnTimeout
 * @param {boolean} phoneHomeShouldWait
 * @param {number} phoneHomeTimeoutSeconds
 * @param {string} sshKey
 * @param {string} userName
 * @param {Array/CompositeType(name:string,description:string,unitNumber:string,blockDevice:VRA:BlockDevice,scsiController:string,diskAttachmentProperties:Properties):disks} disks
 * @param {Array/CompositeType(name:string,description:string,fabricNetwork:VRA:FabricNetwork,networkId:string,deviceIndex:string,addresses:Array/string,macAddress:string,securityGroupIds:Array/string,customProperties:Properties):nics} nics
 * @param {VRA:Project} projectInput
 * @return {VRA:Machine} machine
 */
var machineService = host.createInfrastructureClient().createMachineService();

var machineSpec = new VraMachineSpecification();
machineSpec.description=description;
machineSpec.name=name;

machineSpec.machineCount=machineCount;

machineSpec.flavor=flavor;
machineSpec.image=image;

machineSpec.flavorRef=flavorRef;
machineSpec.imageRef=imageRef;

machineSpec.projectId=projectInput.id;

//Add customproperties
for(var key in customProperties) {
    machineSpec.putCustomPropertiesItem(key, customProperties[key]);
}

//Add constraints
for(var index in constraints) {
    var constraintItem = constraints[index];
    var vraConstraint = new VraConstraint();
    vraConstraint.expression = constraintItem;
    vraConstraint.mandatory = true;
    machineSpec.addConstraintsItem(vraConstraint);
}

var tagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(tags);

//Converting tags to tag object
var newTags = new Array();
for each(var tagProp in tagPropertiesArray){
         var tag = new VraTag();
         tag.key = tagProp.key;
         tag.value = tagProp.value;
         machineSpec.addTagsItem(tag);
}

//Add Boot Config settings
if(machineBootConfig){
    var machineConfig = new VraMachineBootConfig();
    machineConfig.content = machineBootConfig;
    machineSpec.bootConfig = machineConfig;
}

var machineBootSettingConfig = new VraMachineBootConfigSettings();
if(phoneHomeShouldWait){
    machineBootSettingConfig.phoneHomeShouldWait = phoneHomeShouldWait;
}
if(phoneHomeFailOnTimeout){
    machineBootSettingConfig.phoneHomeFailOnTimeout = phoneHomeFailOnTimeout;
}
if(phoneHomeTimeoutSeconds){
    machineBootSettingConfig.phoneHomeTimeoutSeconds = phoneHomeTimeoutSeconds;
}
machineSpec.bootConfigSettings = machineBootSettingConfig;

//Add remote access 
var remoteAccess = new VraRemoteAccessSpecification();
if(authentication){
    remoteAccess.authentication = authentication;
    if(authentication === "usernamePassword"){
        remoteAccess.username = userName;
        remoteAccess.password = password;
    }
    else if(authentication === "publicPrivateKey") {
        remoteAccess.sshKey = sshKey;
        remoteAccess.username = userName;
    }
    else if(authentication === "generatedPublicPrivateKey"){
        remoteAccess.username = userName;
    }
    else if(authentication === "keyPairName"){
        remoteAccess.keyPair = keyPair;
    }
}
machineSpec.remoteAccess = remoteAccess;

//Add disks details
setMachineDisks(disks, machineSpec);

//Add nics details
setMachineNics(nics, machineSpec);

machine = machineService.createMachine(machineSpec);
System.log("Create machine request has been successfully completed with machine id " + machine.id)

 
function setMachineDisks(disks, machineSpec) {
    if(disks != null && disks.length > 0){
        for (var i = 0; i < disks.length; i++) {
            var diskAttachmentSpecification = new VraDiskAttachmentSpecification();
            var name = disks[i]['name'];
            diskAttachmentSpecification.name = name;
            var desc = disks[i]['description'];
            diskAttachmentSpecification.description = desc;
            var unitNumber = disks[i]['unitNumber'];
            diskAttachmentSpecification.unitNumber = unitNumber;
            var blockDeviceId = disks[i]['blockDevice'].id;
            diskAttachmentSpecification.blockDeviceId = blockDeviceId;
            var scsiController = disks[i]['scsiController'];
            diskAttachmentSpecification.scsiController = scsiController;
            var diskAttachmentProperties = disks[i]['diskAttachmentProperties'];
            for(var key in diskAttachmentProperties){
                diskAttachmentSpecification.putDiskAttachmentPropertiesItem(key, diskAttachmentProperties[key])
            }
            machineSpec.addDisksItem(diskAttachmentSpecification);
        }
    }   
}

function setMachineNics(nics, machineSpec) {
    if(nics != null && nics.length > 0){
        for (var i = 0; i < nics.length; i++) {
            //Mandatory selection validation
            if(!nics[i]['fabricNetwork'] && !nics[i]['networkId']){
                throw new Error('For any Network Interface, selection of either Network Id or Fabric Network is mandatory.');
            }
            //Single selection validation
            if(nics[i]['fabricNetwork'] && nics[i]['networkId']){
                throw new Error('For any Network Interface, either Network Id or Fabric Network can be specified, not both.');
            }
            var nicAttachmentSpecification = new VraNetworkInterfaceSpecification();
            var name = nics[i]['name'];
            nicAttachmentSpecification.name = name;
            var desc = nics[i]['description'];
            nicAttachmentSpecification.description = desc;
            var networkId = nics[i]['networkId'];
            nicAttachmentSpecification.networkId = networkId;
            var deviceIndex = nics[i]['deviceIndex'];
            nicAttachmentSpecification.deviceIndex = deviceIndex;
            var macAddress = nics[i]['macAddress'];
            nicAttachmentSpecification.macAddress = macAddress;
            var customProperties = nics[i]['customProperties'];
            for(var key in customProperties){
                nicAttachmentSpecification.putCustomPropertiesItem(key, customProperties[key])
            }
            if(nics[i]['fabricNetwork']){
                var fabricNetworkId = nics[i]['fabricNetwork'].id;
                nicAttachmentSpecification.fabricNetworkId = fabricNetworkId;
            }
            var addresses = nics[i]['addresses'];
            for(var index in addresses){
                nicAttachmentSpecification.addAddressesItem(addresses[index]);
            }
            var securityGroupIds = nics[i]['securityGroupIds'];
            for(var index in securityGroupIds){
                nicAttachmentSpecification.addSecurityGroupIdsItem(securityGroupIds[index]);
            }
            machineSpec.addNicsItem(nicAttachmentSpecification);
        }
    }

}