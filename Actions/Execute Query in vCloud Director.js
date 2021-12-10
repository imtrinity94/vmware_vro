// code placeholder
var queryService = vcdHost.getQueryService();
var name = 'true'
System.log("*** Default queries. ***");
System.log("Querying Catalogs.");
executeQuery(queryService, 'queryCatalogRecords', 'Catalog', VclQueryCatalogField.ISSHARED, name, new VclQueryResultCatalogRecord());

function executeQuery(queryService, funcName, objectType, fieldName, filterByName, recordObject) {
    var expression = new VclExpression(fieldName, filterByName, VclExpressionType.EQUALS);
    var filter = new VclFilter(expression);
    var params = new VclQueryParams();
    params.setFilter(filter);
    params.addMetadataField('TELUSSharedCatalog', VclMetadataDomain.SYSTEM)
    params.addMetadataField('TELUSSharedCatalogType', VclMetadataDomain.SYSTEM)
    var resultSet = queryService[funcName](params);
    while (resultSet != null) {
        var records = resultSet.getRecords(recordObject);
        for each(var record in records) {
            System.log(objectType + ": " + record.name);
            if (typeof record !== typeof recordObject) {
                throw 'invalid type.';
            }
        }
        resultSet = resultSet.getNextPage();
    }
}
System.log("*** Default queries end. ***");
