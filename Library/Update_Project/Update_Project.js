/**
 * Simple task with custom script capability.
 *
 * @param {string} name
 * @param {string} description
 * @param {Array/CompositeType(key:string,value:string,encrypted:boolean):customProperties} customProperties
 * @param {string} requestTimeout
 * @param {Array/string} newExtensibilityConstraints
 * @param {Array/string} newStorageConstraints
 * @param {Array/string} newNetworkConstraints
 * @param {string} placementPolicy
 * @param {string} namingTemplate
 * @param {Array/CompositeType(cloudZone:VRA:Zone,provisioningPriority:number,instancesLimit:number,memoryLimitMB:number,cpuLimit:number,storageLimitGB:number):zoneAssignmentConfig} cloudZones
 * @param {Array/string} newTags
 * @param {VRA:Project} projectInput
 * @param {boolean} sharedResources
 * @return {VRA:Project} updatedProject
 */
var project = projectInput;
var projectSpecification = new VraProjectSpecification();
projectSpecification.name = name;
projectSpecification.description = description;
projectSpecification.placementPolicy = placementPolicy;
projectSpecification.machineNamingTemplate = namingTemplate;
projectSpecification.sharedResources = sharedResources;

//network constraints update
var oldNetworkConstraints = System.getModule("com.vmware.library.vra.infrastructure.util").getProjectConstraints(projectInput, "network");
var nConstraints = System.getModule("com.vmware.library.vra.infrastructure.util").getProjectConstraintsProperties(oldNetworkConstraints, newNetworkConstraints);
addConstraints("network", nConstraints, projectSpecification);

//storage constraints update
var oldStorageConstraints = System.getModule("com.vmware.library.vra.infrastructure.util").getProjectConstraints(projectInput, "storage");
var sConstraints = System.getModule("com.vmware.library.vra.infrastructure.util").getProjectConstraintsProperties(oldStorageConstraints, newStorageConstraints);
addConstraints("storage", sConstraints, projectSpecification);

//extensibility constraints update
var oldExtensibilityConstraints = System.getModule("com.vmware.library.vra.infrastructure.util").getProjectConstraints(projectInput, "extensibility");
var eConstraints = System.getModule("com.vmware.library.vra.infrastructure.util").getProjectConstraintsProperties(oldExtensibilityConstraints, newExtensibilityConstraints);
addConstraints("extensibility", eConstraints, projectSpecification);

//custom properties update
var cProperties = System.getModule("com.vmware.library.vra.infrastructure.util").createProjectCustomProperties(project, customProperties);
if (cProperties) {
    Object.keys(cProperties).forEach(function(key) {
        projectSpecification.putCustomPropertiesItem(key, cProperties.get(key));
    });
}

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

//convert timeout from human readable to the seconds format
var timeOutInSeconds = System.getModule("com.vmware.library.vra.infrastructure.util").convertTimeoutToSec(requestTimeout, true);
projectSpecification.operationTimeout = timeOutInSeconds;

var projectService = project.host.createInfrastructureClient().createProjectService();
updatedProject = projectService.updateProject(project.id, projectSpecification);
//check if project object returned has the id value in it
if (!updatedProject || !updatedProject.id) {
    throw "Project Update operation failed. Please check the system logs for more details.";
}
System.log("Project: " + updatedProject.name + " updated successfully!");


function addConstraints(type, cProperties, projectSpecification) {
    var constraintsArray = new Array();
    for (var c = 0; c < cProperties.length; c++) {
        var constr = new VraConstraint();
        constr.expression = cProperties[c].key;
        constr.mandatory = cProperties[c].value;
        constraintsArray.push(constr);
    }
    if (constraintsArray.length > 0) {
        projectSpecification.putConstraintsItem(type, constraintsArray);
    }
    return projectSpecification;
}