/**
 * Set Machine Name
 *
 * @param {Properties} inputProperties
 * @return {Array/string} resourceNames
 */
// Dump input properties from EBS event
function dumpProperties(props, lvl) {
	var keys = props.keys;
	var prefix = ""
    for (var i=0; i<lvl; i++){
		prefix = prefix + " ";
	} 
	for (k in keys){
		var key = keys[k];
		var value = props.get(keys[k])
		if ("Properties" == System.getObjectType(value)){
		  System.log(prefix + key + "[" )
		  dumpProperties(value, (lvl+2));
		  System.log(prefix + "]" )
		} else {
		  System.log( prefix + key + ":" + value)
		}
	}
}

// Print the properties from the event received from EBS
//dumpProperties(inputProperties, 0);
projectId = inputProperties.get("projectId");
System.log("Current projectId = " + projectId);

// Retrieve the current projectName from VMware Cloud
var endpoint = CloudEndpointManager.getDefaultEndpoint();
if (endpoint) {
	var request = new CloudRequest();
	request.setEndpoint(endpoint);
	request.setPath("/project-service/api/projects/" + projectId); //project-service/api/projects
	request.setHttpMethod("get");
	var response = CloudRequestExecutor.execute(request);
	var responseAsJson = response.contentAsString;
	System.log(responseAsJson);
	var parsedJson = JSON.parse(responseAsJson);
	var projectName = parsedJson.name;
	System.log(projectName);
	
	var currentNames = inputProperties.get("resourceNames")
	resourceNames = []
	for (var i in currentNames){
	    var newName = projectName + "-" + currentNames[i];
	    System.log("The new resource name = " + newName);
    resourceNames.push(newName)
    }

} else {
    resourceNames = inputProperties.get("resourceNames")
    System.log("Cannot find the default cloud endpoint (VMware Cloud Services).");
}


