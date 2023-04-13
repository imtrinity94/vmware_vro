System.log("Organization Name: " + vcdHost.organization);
if(vcdHost.organization != "system")
    System.log("Not system admin. skipping query.");
else {
    var queryService = vcdHost.getQueryService();

    var expression = new VclExpression(VclQueryAdminVMField.NAME, name , VclExpressionType.EQUALS);
    var filter = new VclFilter(expression);
    var params = new VclQueryParams();
    params.setFilter(filter);
    var fields = new Array();
    fields.push(VclQueryVAppField.NAME);
    params.addSortFields(fields, VclSortType.SORT_ASC);
    var resultSet = queryService.queryRecords(VclQueryRecordType.ADMINVM, params);

    while (resultSet != null)  {
        var records = resultSet.getRecords(new VclQueryResultAdminVMRecord());
        for each (var record in records) {
            System.log("Admin VM: " + record.name);
        }
        resultSet = resultSet.getNextPage();
    }
}
System.log("*** Admin Vms end. ***");

var queryService = vcdHost.getQueryService();
System.log("*** Default queries. ***");
System.log("Querying Catalogs.");
executeQuery(queryService, 'queryCatalogRecords', 'Catalog',VclQueryCatalogField.NAME, name, new VclQueryResultCatalogRecord());
System.log("Querying Vms.");
executeQuery(queryService, 'queryVmRecords', 'VM',VclQueryVMField.NAME, name, new VclQueryResultVMRecord());
System.log("Querying VApps.");
executeQuery(queryService, 'queryvAppRecords', 'VApp',VclQueryVAppField.NAME, name, new VclQueryResultVAppRecord());
System.log("Querying VApp Templates.");
executeQuery(queryService, 'queryvAppTemplateRecords', 'Template',VclQueryVAppTemplateField.NAME, name, new VclQueryResultVAppTemplateRecord());
System.log("Querying Media.");
executeQuery(queryService, 'queryMediaRecords', 'Media',VclQueryMediaField.NAME, name, new VclQueryResultMediaRecord());
System.log("Querying Disks.");
executeQuery(queryService, 'queryDiskRecords', 'Disk',VclQueryDiskField.NAME, name, new VclQueryResultDiskRecord());


System.log("*** Default queries end. ***");

var queryService = vcdHost.toAdminObject().getAdminQueryService();
System.log("*** Admin queries. ***");
System.log("Querying Groups.");
executeQuery(queryService, 'queryGroupReferences', 'Group',VclQueryGroupField.NAME, name, new VclQueryResultCatalogRecord());
System.log("Querying Users.");
executeQuery(queryService, 'queryUserReferences', 'User',VclQueryUserField.NAME, name, new VclQueryResultVMRecord());
System.log("Querying Stranded users.");
executeQuery(queryService, 'queryStrandedUserReferences', 'SUser',VclQueryStrandedUserField.NAME, name, new VclQueryResultVAppRecord());
System.log("Querying Roles.");
executeQuery(queryService, 'queryRoleReferences', 'Role',VclQueryRoleField.NAME, name, new VclQueryResultVAppTemplateRecord());
System.log("Querying Rights.");
executeQuery(queryService, 'queryRightReferences', 'Right',VclQueryRightField.NAME, name, new VclQueryResultMediaRecord());
System.log("Querying Orgs.");
executeQuery(queryService, 'queryOrgReferences', 'Org',VclQueryOrgField.NAME, name, new VclQueryResultDiskRecord());
System.log("Querying OrgVdcs.");
executeQuery(queryService, 'queryOrgVdcReferences', 'OrgVdc',VclQueryOrgVdcField.NAME, name, new VclQueryResultDiskRecord());

System.log("*** Admin queries end. ***");

var queryService = vcdHost.toAdminObject().toAdminExtensionObject().getExtensionQueryService();
System.log("*** Admin extension queries. ***");
System.log("Querying Hosts.");
executeQuery(queryService, 'queryHostIdRecords', 'Host',VclQueryHostField.NAME, name, new VclQueryResultHostRecord());
System.log("Querying Datastores.");
executeQuery(queryService, 'queryDatastoreIdRecords', 'Datastore',VclQueryDatastoreField.NAME, name, new VclQueryResultDatastoreRecord());
System.log("Querying External networks.");
executeQuery(queryService, 'queryExternalNetworkIdRecords', 'Network',VclQueryNetworkField.NAME, name, new VclQueryResultNetworkRecord());
System.log("Querying Network pools.");
executeQuery(queryService, 'queryNetworkPoolIdRecords', 'Pool',VclQueryNetworkPoolField.NAME, name, new VclQueryResultNetworkPoolRecord());
System.log("Querying Provider Vdcs.");
executeQuery(queryService, 'queryProviderVdcIdRecords', 'PVDC',VclQueryOrgVdcField.NAME, name, new VclQueryResultVMWProviderVdcRecord());
System.log("Querying Vim Servers.");
executeQuery(queryService, 'queryVimServerIdRecords', 'VimServer',VclQueryVirtualCenterField.NAME, name, new VclQueryResultVirtualCenterRecord());
System.log("Querying all Org Networks.");
executeQuery(queryService, 'queryAllOrgNetworkIdRecords', 'OrgNetwork',VclQueryOrgVdcNetworkField.NAME, name, new VclQueryResultAdminOrgNetworkRecord());
System.log("Querying all OrgVdcs.");
executeQuery(queryService, 'queryAllOrgVdcIdRecords', 'OrgVdc',VclQueryOrgVdcField.NAME, name, new VclQueryResultAdminVdcRecord());
System.log("Querying all VApps.");
executeQuery(queryService, 'queryAllVappIdRecords', 'VApp',VclQueryVAppField.NAME, name, new VclQueryResultAdminVAppRecord());

function executeQuery(queryService, funcName, objectType, fieldName, filterByName, recordObject) {
    var expression = new VclExpression(fieldName, filterByName, VclExpressionType.EQUALS);
    var filter = new VclFilter(expression);
    var params = new VclQueryParams();
    params.setFilter(filter);

    var resultSet = queryService[funcName](params);

    while (resultSet != null)  {
        var records = resultSet.getRecords(recordObject);
        for each (var record in records) {
            System.log(objectType + ": " + record.name);
            if(typeof record !== typeof recordObject) {
                throw 'invalid type.';
            }
        }
        resultSet = resultSet.getNextPage();
    }
}

System.log("*** Admin queries end. ***");
