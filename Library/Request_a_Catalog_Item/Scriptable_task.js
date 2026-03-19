/**
 * Simple task with custom script capability.
 *
 * @param {VCFA:Host} host
 * @param {string} deploymentName
 * @param {string} requestInputs
 * @param {string} catalogItemId
 * @param {VCFA:Project} project
 */
var restClient = host.createRestClient();
var input = JSON.parse(requestInputs);

var requestBody = {
    "deploymentName":deploymentName,
    "reason":"",
    "projectId":project.id,
    "bulkRequestCount":1,
    "inputs": input
}

var restRequest = restClient.createRequest("POST", 
               "/catalog/api/items/" + catalogItemId + "/request", JSON.stringify(requestBody));

var response = restClient.post(restRequest);

System.log(response.contentAsString);