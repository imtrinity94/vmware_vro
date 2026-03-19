/**
 * Simple task with custom script capability.
 *
 * @param {string} name
 * @param {string} description
 * @param {VRA:Project} projectInput
 * @param {VRA:Host} host
 * @param {Array/string} constraints
 * @param {Properties} customProperties
 * @param {boolean} createGateway
 * @param {boolean} outboundAccess
 * @param {Array/string} tags
 * @param {string} deploymentId
 * @return {VRA:RequestTracker} requestTracker
 */
var networkSpecification = new VraNetworkSpecification();
networkSpecification.name = name;
networkSpecification.description = description;
networkSpecification.projectId = projectInput.id;

//Add constraints
for(var index in constraints) {
    var constraintItem = constraints[index];
    var vraConstraint = new VraConstraint();
    vraConstraint.expression = constraintItem;
    vraConstraint.mandatory = true;
    networkSpecification.addConstraintsItem(vraConstraint);
}
//Add custom properties
for(var key in customProperties) {
    networkSpecification.putCustomPropertiesItem(key, customProperties[key]);
}

var tagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(tags);

//Converting tags to tag object
var newTags = new Array();
for each(var tagProp in tagPropertiesArray){
         var tag = new VraTag();
         tag.key = tagProp.key;
         tag.value = tagProp.value;
         networkSpecification.addTagsItem(tag);
}

networkSpecification.outboundAccess = outboundAccess;
networkSpecification.createGateway = createGateway;
networkSpecification.deploymentId = deploymentId;

var networkService = host.createInfrastructureClient().createNetworkService();
requestTracker =  networkService.createNetwork(networkSpecification);
System.log("Create Network request has been successfully placed with request tracking id " + requestTracker.id)
