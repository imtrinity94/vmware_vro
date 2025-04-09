var objVclExpression1;
	objVclExpression1 = new VclExpression(VclQueryAdminVdcField.NAME, strVirtualDataCenterName, VclExpressionType.EQUALS);

var objVclExpression2;
	objVclExpression2 = new VclExpression(VclQueryAdminVdcField.ISENABLED, true, VclExpressionType.EQUALS);

var objVclExpression3;
	objVclExpression3 = new VclExpression(VclQueryAdminVdcField.ISSYSTEMVDC, false, VclExpressionType.EQUALS);

var arrVclExpression;
	arrVclExpression = new Array();
	arrVclExpression.push(objVclExpression1);
	arrVclExpression.push(objVclExpression2);
	arrVclExpression.push(objVclExpression3);

var objVclFilter;
	objVclFilter = new VclFilter(arrVclExpression, VclFilterType.AND);

var arrFields;
	arrFields = new Array();
	arrFields.push(VclQueryOrgVdcField.NAME);

var objVclQueryParams;
	objVclQueryParams = new VclQueryParams();
	objVclQueryParams.setFilter(objVclFilter);
	objVclQueryParams.setFields(arrFields);

var objVclQueryService;
	objVclQueryService = objVclHost.getQueryService();

var objVclAbstractRecordResultSet;
	objVclAbstractRecordResultSet = objVclQueryService.queryRecords(VclQueryRecordType.ADMINORGVDC, objVclQueryParams);

if (objVclAbstractRecordResultSet == null) 
{
	throw "No matching Organisational Virtual Data Center found.";
}
else if (objVclAbstractRecordResultSet.getTotal() == 0) 
{
	throw "No matching Organisational Virtual Data Center found.";
}
else
{
	var arrVclQueryResultAdminVdcRecord;
		arrVclQueryResultAdminVdcRecord = objVclAbstractRecordResultSet.getRecords(new VclQueryResultAdminVdcRecord());

	for each (var objVclQueryResultAdminVdcRecord in arrVclQueryResultAdminVdcRecord) 
	{
		var objVclReference;
			objVclReference = new VclReference();
			objVclReference.href = objVclQueryResultAdminVdcRecord.href;
			objVclReference.name = objVclQueryResultAdminVdcRecord.name;

		var objVclAdminVdc;
			objVclAdminVdc = objVclHost.getEntityByReference(VclFinderType.ADMIN_VDC, objVclReference);

		var objVclVdc;
			objVclVdc = objVclAdminVdc.toUserObject();

		if ( objVclVdc == null )
		{
			throw "No matching department Organisational Virtual Data Center found.";
		}
		else
		{
			var objVclOrganization;
				objVclOrganization = objVclVdc.parent;

			var arrVclOrgVdcNetwork;
				arrVclOrgVdcNetwork = objVclVdc.getOrgVdcNetworks();

			for(var i = 0; i < arrVclOrgVdcNetwork.length; i++)
			{
				var objVclOrgVdcNetwork;
					objVclOrgVdcNetwork = arrVclOrgVdcNetwork[i];

				var strVclOrgVdcNetworkName;
					strVclOrgVdcNetworkName = objVclOrgVdcNetwork.name;

				if ( strVclOrgVdcNetworkName.toUpperCase() == strVirtualDataCentre )
				{
					System.log("===== Network Name: " + objVclOrgVdcNetwork.name);

					break;
				}
			}

			if ( objVclOrgVdcNetwork == null )
			{
				throw "Could not find an Organisational Virtual Data Center Network";
			}
		}
	}
}
