/**
 * @description Executes a filtered query against vCloud Director's query service for Catalog
 *              objects and pages through all results, logging each record name.
 *              Uses a helper function to handle pagination and type validation.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclHost} vcdHost - The vCloud Director host to query.
 * @returns {void}
 */

var queryService = vcdHost.getQueryService();
var name = 'true';
System.log("*** Default queries. ***");
System.log("Querying Catalogs.");
executeQuery(queryService, 'queryCatalogRecords', 'Catalog', VclQueryCatalogField.ISSHARED, name, new VclQueryResultCatalogRecord());

/**
 * Executes a query on the vCloud query service, paging through all results.
 *
 * @param {*} queryService - The vCloud query service object.
 * @param {string} funcName - The name of the query function to call on the query service.
 * @param {string} objectType - A label for the object type being queried (used in logging).
 * @param {*} fieldName - The field on which to filter results.
 * @param {string} filterByName - The value to match against the field.
 * @param {*} recordObject - A prototype record object used for type checking and result extraction.
 */
function executeQuery(queryService, funcName, objectType, fieldName, filterByName, recordObject) {
    var expression = new VclExpression(fieldName, filterByName, VclExpressionType.EQUALS);
    var filter = new VclFilter(expression);
    var params = new VclQueryParams();
    params.setFilter(filter);
    params.addMetadataField('TELUSSharedCatalog', VclMetadataDomain.SYSTEM);
    params.addMetadataField('TELUSSharedCatalogType', VclMetadataDomain.SYSTEM);
    var resultSet = queryService[funcName](params);
    while (resultSet != null) {
        var records = resultSet.getRecords(recordObject);
        for each (var record in records) {
            System.log(objectType + ": " + record.name);
            if (typeof record !== typeof recordObject) {
                throw 'invalid type.';
            }
        }
        resultSet = resultSet.getNextPage();
    }
}

System.log("*** Default queries end. ***");
