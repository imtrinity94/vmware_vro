//Inputs: vcdHost -> VCLOUD:HOST
var queryService = vcdHost.getQueryService();

var expression = new VclExpression(VclQueryVAppTemplateField.NAME,"*", VclExpressionType.EQUALS);
var filter = new VclFilter(expression);
var params = new VclQueryParams();
params.setFilter(filter);
var resultSet = queryService.queryRecords(VclQueryRecordType.VAPPTEMPLATE, params);

var vAppTemplates = new Array();

while (resultSet != null)  {
	var records = resultSet.getRecords(new VclQueryResultVAppTemplateRecord());
	for each (var record in records) {
		var vAppTemplateRef = new VclReference();
		vAppTemplateRef.href = record.href;
		vAppTemplateRef.name = record.name;
		vAppTemplateRef.type = record.type;
		var vAppTemplate = vcdHost.getEntityByReference(VclFinderType.VAPP_TEMPLATE, vAppTemplateRef);
		
		if (vAppTemplate != null) {
			vAppTemplates.push(vAppTemplate);
    	}
	}
    resultSet = resultSet.getNextPage();
}
for each(var i in vAppTemplates)
System.log(i.name);
