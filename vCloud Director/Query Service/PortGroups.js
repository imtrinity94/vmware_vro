/*Input:
Name                         Type                   
vcdHost:                    vCloud:Host
portGroupName          string
Output
Name                        Type
resultSet                    String
*/
var queryService = vcdHost.getQueryService();
expression = new VclExpression(VclQueryPortgroupField.NAME, portGroupName, VclExpressionType.EQUALS);
filter = new VclFilter(expression);
params = new VclQueryParams();
params.setFilter(filter);
var resultSet = queryService.queryRecords(VclQueryRecordType.PORTGROUP, params);
while (resultSet != null) {
    var records = resultSet.getRecords(new VclQueryResultPortgroupRecord());
    System.log(records.length + "I have found something!!")
    for each(var record in records) {
        if (record.name == portGroupName {
                record2 = record.moref;
            }
        }
        resultSet = resultSet.getNextPage();
    }
    System.log(resultSet)
