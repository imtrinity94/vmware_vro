/**
 * Simple task with custom script capability.
 *
 * @param {VCFA:Host} host
 * @param {string} requestInputs
 * @param {Properties} inputHeaders
 * @return {Properties} result
 */
var restClient = host.createRestClient();
var result = {};
var request = restClient.createRequest("GET", "/cloudapi/1.0.0/orgs?page=1&pageSize=125", null);

var keys = inputHeaders.keys;
for(var key in keys){
    request.setHeader(keys[key], inputHeaders.get(keys[key]));
    System.log("Value for key: "+keys[key] +" is: "+inputHeaders.get(keys[key]));
}

var response = restClient.execute(request);
System.log("Select System tenant as VCFA endpoint");
//System.log(response.contentAsString);
jsonResult = JSON.parse(response.contentAsString);
System.log("Total tenant count is: " + jsonResult.resultTotal);
System.log("The tenant IDs are: ")
for (i in jsonResult.values) {
    System.log(jsonResult.values[i].name + ', ' + jsonResult.values[i].id);
    result[jsonResult.values[i].name] = jsonResult.values[i].id;
}