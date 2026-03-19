/**
 * Simple task with custom script capability.
 *
 * @param {string} name
 * @param {string} description
 * @param {VRA:Host} host
 * @param {string} namngTemplate
 * @param {string} timeout
 * @param {string} placementPolicy
 * @param {Array/CompositeType(key:string,value:string,encrypted:boolean):customProperties} customProperties
 * @param {Array/string} newExtensibilityConstraints
 * @param {Array/string} newNetworkConstraints
 * @param {Array/string} newStorageConstraints
 * @param {Array/CompositeType(cloudZone:VRA:Zone,provisioningPriority:number,instancesLimit:number,memoryLimitMB:number,cpuLimit:number,storageLimitGB:number):projectCloudZones} cloudZones
 * @param {boolean} sharedResources
 * @return {VRA:Project} project
 */
var projectSpecification = new VraProjectSpecification();
projectSpecification.name = name;
projectSpecification.description = description;
projectSpecification.placementPolicy = placementPolicy;
projectSpecification.machineNamingTemplate = namngTemplate;

var requestTimeoutInSeconds = System.getModule("com.vmware.library.vra.infrastructure.util")
                                    .convertTimeoutToSec(timeout, true);
projectSpecification.operationTimeout = requestTimeoutInSeconds;
projectSpecification.sharedResources = sharedResources;

//Addition of zones to project.
if (cloudZones != null && cloudZones.length == 0) {
    projectSpecification.zoneAssignmentConfigurations = [];
} else if (cloudZones != null && cloudZones.length > 0) {
    for (var i = 0; i < cloudZones.length; i++) {
        var zoneAssignmentConfiguration = new VraZoneAssignmentSpecification();
        zoneAssignmentConfiguration.zoneId = cloudZones[i]['cloudZone'].id;
        zoneAssignmentConfiguration.priority = cloudZones[i]['provisioningPriority'];
        zoneAssignmentConfiguration.maxNumberInstances = cloudZones[i]['instancesLimit'];
        var memoryLimitCheck = System.getModule("com.vmware.library.vra.infrastructure.util")
            .validateProjectZoneMemoryLimit(cloudZones[i]['memoryLimitMB']);
        if (!memoryLimitCheck) {
            throw "Some of your changes could not be applied: 'memoryLimitMB' must be 0 (no limit) or at least 4,194,304 bytes. (4MB)."
        }
        zoneAssignmentConfiguration.memoryLimitMB = cloudZones[i]['memoryLimitMB'];
        zoneAssignmentConfiguration.cpuLimit = cloudZones[i]['cpuLimit'];
        zoneAssignmentConfiguration.storageLimitGB = cloudZones[i]['storageLimitGB'];
        projectSpecification.addZoneAssignmentConfigurationsItem(zoneAssignmentConfiguration);
    }
}

//Addition of network constraints.
addConstraints("network", newNetworkConstraints, projectSpecification);

//Addition of storage constraints.
addConstraints("storage", newStorageConstraints, projectSpecification);

//Addition of extensibility constraints.
addConstraints("extensibility", newExtensibilityConstraints, projectSpecification);

var customPropertiesJson = JSON.stringify(customProperties);
var customPropertiesParsed = JSON.parse(customPropertiesJson);
if(customPropertiesParsed != null && customPropertiesParsed.length > 0){
    for (var i = 0; i < customPropertiesParsed.length; i++) {
        var value = customPropertiesParsed[i]['value'];
        if(customPropertiesParsed[i]['encrypted']){
            value = "((sensitive:" + value + "))";
        }
        projectSpecification.putCustomPropertiesItem(customPropertiesParsed[i]['key'], value);
    }
}
var projectService = host.createInfrastructureClient().createProjectService();
project = projectService.createProject(projectSpecification);
if (!project || !project.id || !project.name) {
    throw "Project Create operation failed. Please check the system logs for more details."
}
var projectName = project.name;

System.log("Project: " + projectName + " created successfully");

function addConstraints(type, newConstraints, projectSpecification) {
    var nConstraintObjectsArray = new Array();
    
    if(newConstraints && newConstraints.length >0){
        for(var i=0;i<newConstraints.length;i++){
            var constraintObj = new VraConstraint();
            constraintObj.expression = newConstraints[i];
            constraintObj.mandatory = true;
            nConstraintObjectsArray.push(constraintObj);
        }
    }
    //Addition of type constraints.
    if(nConstraintObjectsArray && nConstraintObjectsArray.length >0){
        projectSpecification.putConstraintsItem(type,nConstraintObjectsArray);
    }
    return projectSpecification;
}