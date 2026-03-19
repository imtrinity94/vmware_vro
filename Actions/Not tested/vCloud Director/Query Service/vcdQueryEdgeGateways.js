/**
 * Executes a specific query to locate vCloud Director Edge Gateways by name.
 * Demonstrates the use of dynamic function invocation and record retrieval.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:Host} vcloudHostInstance - The vCloud host object.
 * @param {string} edgeGatewaySearchName - The name of the Edge Gateway to find.
 * @returns {void}
 */

var standardQuerySvc = vcloudHostInstance.getQueryService();

/**
 * Dispatches a vCD Query and logs results.
 */
function dispatchVcdEdgeQuery(svcObj, apiMethodStr, objectTypeLabel, filterField, filterValue, recordPrototype) {
    var queryExpression = new VclExpression(filterField, filterValue, VclExpressionType.EQUALS);
    var queryParamsObj = new VclQueryParams();
    var filterObj = new VclFilter(queryExpression);
    
    queryParamsObj.setFilter(filterObj);
    
    System.log("Querying Edge Gateway records using API: " + apiMethodStr);
    var currentResultSet = svcObj[apiMethodStr](queryParamsObj);
    
    while (currentResultSet !== null) {
        var currentBatchRecords = currentResultSet.getRecords(recordPrototype);
        
        var i;
        for (i = 0; i < currentBatchRecords.length; i++) {
            var edgeRecord = currentBatchRecords[i];
            System.log(" [Match Discovered] " + objectTypeLabel + ": " + edgeRecord.name);
            
            // Runtime type verification
            if (typeof edgeRecord !== typeof recordPrototype) {
                System.warn("Potential Type Inconsistency: Discovered record does not align with prototype template.");
            }
        }
        
        currentResultSet = currentResultSet.getNextPage();
    }
}

dispatchVcdEdgeQuery(
    standardQuerySvc, 
    'queryEdgeGatewayRecords', 
    'edgeGateway', 
    VclQueryEdgeGatewayField.NAME, 
    edgeGatewaySearchName, 
    new VclQueryResultEdgeGatewayRecord()
);

return null;
