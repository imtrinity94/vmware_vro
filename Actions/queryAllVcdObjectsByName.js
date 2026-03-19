/**
 * Executes a comprehensive suite of queries across various vCloud Director object types
 * including VMs, Catalogs, VApps, and administrative entities.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:Host} vcloudHostObj - The vCloud host object.
 * @param {string} searchStringName - The name string to filter objects by.
 * @returns {void}
 */

System.log("Initiating Multi-Scope vCD Query for organization context: " + vcloudHostObj.organization);

// Section 1: Administrator VM Inventory Query (System Context Only)
if (vcloudHostObj.organization !== "system") {
    System.warn("Extended Admin Query Aborted: Current context is not 'system' admin.");
} else {
    var vcloudQuerySvc = vcloudHostObj.getQueryService();
    var vmNameExpression = new VclExpression(VclQueryAdminVMField.NAME, searchStringName, VclExpressionType.EQUALS);
    var vmFilter = new VclFilter(vmNameExpression);
    var vmQueryParams = new VclQueryParams();
    vmQueryParams.setFilter(vmFilter);
    
    // Sorting by vApp membership
    var sortFieldsList = [VclQueryVAppField.NAME];
    vmQueryParams.addSortFields(sortFieldsList, VclSortType.SORT_ASC);
    
    System.log("--- Querying Admin VMs ---");
    var vmResultSet = vcloudQuerySvc.queryRecords(VclQueryRecordType.ADMINVM, vmQueryParams);
    while (vmResultSet !== null) {
        var vmRecordsBatch = vmResultSet.getRecords(new VclQueryResultAdminVMRecord());
        var i;
        for (i = 0; i < vmRecordsBatch.length; i++) {
            System.log(" [Admin VM Match] Name: " + vmRecordsBatch[i].name);
        }
        vmResultSet = vmResultSet.getNextPage();
    }
}

// Section 2: Standard User-Context Queries
var standardQuerySvc = vcloudHostObj.getQueryService();
System.log("--- Executing Standard User Queries ---");
executeRefinedVcdQuery(standardQuerySvc, 'queryCatalogRecords', 'Catalog', VclQueryCatalogField.NAME, searchStringName, new VclQueryResultCatalogRecord());
executeRefinedVcdQuery(standardQuerySvc, 'queryVmRecords', 'VM', VclQueryVMField.NAME, searchStringName, new VclQueryResultVMRecord());
executeRefinedVcdQuery(standardQuerySvc, 'queryvAppRecords', 'VApp', VclQueryVAppField.NAME, searchStringName, new VclQueryResultVAppRecord());
executeRefinedVcdQuery(standardQuerySvc, 'queryvAppTemplateRecords', 'Template', VclQueryVAppTemplateField.NAME, searchStringName, new VclQueryResultVAppTemplateRecord());
executeRefinedVcdQuery(standardQuerySvc, 'queryMediaRecords', 'Media', VclQueryMediaField.NAME, searchStringName, new VclQueryResultMediaRecord());
executeRefinedVcdQuery(standardQuerySvc, 'queryDiskRecords', 'Disk', VclQueryDiskField.NAME, searchStringName, new VclQueryResultDiskRecord());

// Section 3: Administrative Entity Queries
var adminQuerySvc = vcloudHostObj.toAdminObject().getAdminQueryService();
System.log("--- Executing Administrator Queries ---");
executeRefinedVcdQuery(adminQuerySvc, 'queryGroupReferences', 'Group', VclQueryGroupField.NAME, searchStringName, new VclQueryResultCatalogRecord());
executeRefinedVcdQuery(adminQuerySvc, 'queryUserReferences', 'User', VclQueryUserField.NAME, searchStringName, new VclQueryResultVMRecord());
executeRefinedVcdQuery(adminQuerySvc, 'queryRoleReferences', 'Role', VclQueryRoleField.NAME, searchStringName, new VclQueryResultVAppTemplateRecord());
executeRefinedVcdQuery(adminQuerySvc, 'queryOrgReferences', 'Org', VclQueryOrgField.NAME, searchStringName, new VclQueryResultDiskRecord());
executeRefinedVcdQuery(adminQuerySvc, 'queryOrgVdcReferences', 'OrgVdc', VclQueryOrgVdcField.NAME, searchStringName, new VclQueryResultDiskRecord());

// Section 4: Admin Extension Queries (Environmental/Cloud-Level Infrastructure)
var extensionQuerySvc = vcloudHostObj.toAdminObject().toAdminExtensionObject().getExtensionQueryService();
System.log("--- Executing Admin Extension Queries ---");
executeRefinedVcdQuery(extensionQuerySvc, 'queryHostIdRecords', 'Infrastructure Host', VclQueryHostField.NAME, searchStringName, new VclQueryResultHostRecord());
executeRefinedVcdQuery(extensionQuerySvc, 'queryDatastoreIdRecords', 'Datastore', VclQueryDatastoreField.NAME, searchStringName, new VclQueryResultDatastoreRecord());
executeRefinedVcdQuery(extensionQuerySvc, 'queryExternalNetworkIdRecords', 'Ext Network', VclQueryNetworkField.NAME, searchStringName, new VclQueryResultNetworkRecord());
executeRefinedVcdQuery(extensionQuerySvc, 'queryAllOrgNetworkIdRecords', 'Org Network', VclQueryOrgVdcNetworkField.NAME, searchStringName, new VclQueryResultAdminOrgNetworkRecord());
executeRefinedVcdQuery(extensionQuerySvc, 'queryAllOrgVdcIdRecords', 'Org VDC (All)', VclQueryOrgVdcField.NAME, searchStringName, new VclQueryResultAdminVdcRecord());

System.log("All configured vCD object queries completed.");

/**
 * Encapsulated helper for executing paged vCD queries and validating record types.
 */
function executeRefinedVcdQuery(svcHandle, apiMethodName, label, fieldEnum, filterText, recordTypePrototype) {
    var criteriaExpression = new VclExpression(fieldEnum, filterText, VclExpressionType.EQUALS);
    var queryFilterObj = new VclFilter(criteriaExpression);
    var queryParamsObj = new VclQueryParams();
    queryParamsObj.setFilter(queryFilterObj);

    // Call dynamic API method on the query service
    var resultSetBatch = svcHandle[apiMethodName](queryParamsObj);

    while (resultSetBatch !== null) {
        var recordsList = resultSetBatch.getRecords(recordTypePrototype);
        var k;
        for (k = 0; k < recordsList.length; k++) {
            var recordItem = recordsList[k];
            System.log(" [" + label + "] -> " + recordItem.name);
            
            // Runtime type safety check
            if (typeof recordItem !== typeof recordTypePrototype) {
                System.error("Type Mismatch: Record for " + label + " does not match expected prototype.");
            }
        }
        resultSetBatch = resultSetBatch.getNextPage();
    }
}

return null;
