/*

I’ve been using the createRestClient() for a number of use cases recently and today I had to bulk update all the vRealize Automation composite blueprint deployment values along with each components maximum cluster values.

*/



//Set inputs
var componentMaxValue = 1;
var deploymentNumberOfInstances= 10;
 
// create rest endpoint for rest client
var endpoint = "com.vmware.csp.component.cafe.composition.api";
var restClient = vcacCafeHost.createRestClient(endpoint);
var blueprintsUrl = "blueprints";
 
// get blueprints
var blueprints = restClient.get(blueprintsUrl);
var res = blueprints.getBodyAsString();
 
//clean json and parse
var json = JSON.parse(res.replace(/\\/g, '').replace('\t','').replace('\r','').replace('\n',''));
 
// get all blueprints - match on name
for each (var blueprint in json.content){
 
System.log("Blueprint name: " + blueprint.name);
var blueprintsUrl = "blueprints/" + blueprint.id;
System.log("URL for blueprint " + blueprintsUrl);
 
// get blueprint test
var blueprints = restClient.get(blueprintsUrl);
var res = blueprints.getBodyAsString();
 
try {
//clean json and parse
var json = JSON.parse(res.replace(/\\/g, '').replace('\t','').replace('\r','').replace('\n',''));
}
catch(e){
System.log(e + ": Could not parse JSON payload for " + blueprint.name);
continue;
};
 
// gets all components.
for (var component in json.components){
if (json.components[component].data._cluster){
System.log("Found component " + component);
System.log("Current min value configured for component " + json.components[component].data._cluster.facets.minValue.value.value);
 
delete json.components[component].data._cluster.facets.maxValue.value.value;
json.components[component].data._cluster.facets.maxValue.value.value = componentMaxValue;
};
};
if (json.properties._number_of_instances){
 
System.log("Current number of instances value configured for blueprint " + json.properties._number_of_instances.facets.maxValue.value.value);
delete json.properties._number_of_instances.facets.maxValue.value.value;
json.properties._number_of_instances.facets.maxValue.value.value = deploymentNumberOfInstances;
 
};
json = JSON.stringify(json);
restClient.put(blueprintsUrl, json);
};
