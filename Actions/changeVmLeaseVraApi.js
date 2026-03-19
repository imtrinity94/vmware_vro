/*
 * @description vRealize Automation Bulk Update Lease on Virtual Machines.
 *              Uses OData queries to list and update virtual machine leases.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 */

var targetOperationName = "Change Lease";
var daysToExtend = 30;
var expirationLeaseDate = "2017-08-15T00:00:00.000Z";
var maxPageSize = "20";
var vRaEndpoint = "com.vmware.csp.core.cafe.catalog.api";

// host variable expected as input
var vRaRestClient = host.createRestClient(vRaEndpoint);

var initialResults = JSON.parse(fetchApiData());
System.log("Number of pages found from API query: " + initialResults.metadata.totalPages);

var pageIdx;
for (pageIdx = 1; pageIdx <= initialResults.metadata.totalPages; pageIdx++) {
    var pageResults = JSON.parse(fetchApiData(pageIdx));
    if (pageIdx > 1) {
        System.log("Processing page " + pageIdx + " of " + initialResults.metadata.totalPages + ". Sleeping for 60 seconds.");
        System.sleep(60000);
    }

    var deploymentsList = pageResults.content;
    var deployIdx;
    for (deployIdx = 0; deployIdx < deploymentsList.length; deployIdx++) {
        var deployment = deploymentsList[deployIdx];
        System.log("Found Deployment: " + deployment.name);
        var catalogResources = vCACCAFEEntitiesFinder.findCatalogResources(host, deployment.name);
        if (!catalogResources || catalogResources.length === 0) continue;
        var catalogResource = catalogResources[0];

        System.log("Found catalog Resource: " + catalogResource.name);

        var nextLeaseDate = new Date();
        nextLeaseDate.setDate(nextLeaseDate.getDate() + daysToExtend);
        System.log("Setting new lease date to: " + nextLeaseDate);

        var dateTimeLiteral = new vCACCAFEDateTimeLiteral(nextLeaseDate);

        // Get all the operations that are available on the deployment
        var availableOperations = catalogResource.getOperations();
        var targetActionSelected = null;

        var opIdx;
        for (opIdx = 0; opIdx < availableOperations.length; opIdx++) {
            var oper = availableOperations[opIdx];
            System.debug("Operation available: " + oper.getName());
            if (oper.getName().toLowerCase() == targetOperationName.toLowerCase()) {
                System.log("Operation identified and selected: " + oper.getName());
                targetActionSelected = oper;
                break;
            }
        }

        if (targetActionSelected != null) {
            var actionInputs = new Properties();
            actionInputs.put("provider-ExpirationDate", dateTimeLiteral);
            System.getModule("com.vmware.library.vcaccafe.request").requestResourceAction(targetActionSelected, actionInputs);
        }
    }
}

return null;

/**
 * Fetches data from the vRA catalog API.
 */
function fetchApiData(pageNumber) {
    var queryUrl = "consumer/resources?&limit=" + maxPageSize;
    if (pageNumber) {
        queryUrl = queryUrl + "&page=" + pageNumber.toString();
    }
    var fullUrl = queryUrl + "&$filter=resourceType/id eq 'composition.resource.type.deployment' and lease/end lt '" + expirationLeaseDate + "'";
    var response = vRaRestClient.get(fullUrl);
    var body = response.getBodyAsString();
    // Normalize JSON string
    return body.replace(/\\/g, '').replace(/\\t/g, '').replace(/\\r/g, '').replace(/\\n/g, '');
}
