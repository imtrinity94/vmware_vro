var queryService = vCloudHost.getQueryService();
executeQuery(queryService, 'queryEdgeGatewayRecords', 'edgeGateway',VclQueryEdgeGatewayField.NAME, name, new VclQueryResultEdgeGatewayRecord());
function executeQuery(queryService, queryType, objectType, field, filter, recordObject) {
    var myExpression = new VclExpression(fieldName, filterByName, VclExpressionType.EQUALS);
    var myQueryParams = new VclQueryParams();
	var newFilter = new VclFilter(myExpression);
    myQueryParams.setFilter(newFilter);
    var resultSet = queryService[queryType](myQueryParams);
    while (resultSet != null)  {
        var records = resultSet.getRecords(recordObject);
        for each (var record in records) {
            System.log(objectType + ": " + record.name);
            if(typeof(record) != typeof(recordObject)) {
                throw "Type Not Valid!";
            }
        }
        resultSet = resultSet.getNextPage();
    }
}
