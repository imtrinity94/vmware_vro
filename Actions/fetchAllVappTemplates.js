/**
 * Retrieves all vApp Templates from a vCloud Director host using the Query Service.
 * Iterates through all pages of the result set and resolves full entity objects.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:Host} vcloudHostHandle - The vCloud host object.
 * @returns {vCloud:VAppTemplate[]} resolvedVAppTemplatesArray - Array of vApp Templates discovered.
 */

var vcloudQuerySvc = vcloudHostHandle.getQueryService();

// Phase 1: Define Query Criteria (Wildcard Match on Name)
var templateSearchExpression = new VclExpression(VclQueryVAppTemplateField.NAME, "*", VclExpressionType.EQUALS);
var templateQueryFilter = new VclFilter(templateSearchExpression);
var templateQueryParams = new VclQueryParams();
templateQueryParams.setFilter(templateQueryFilter);

// Phase 2: Iterate through Paged Result Sets
var pagedResultSet = vcloudQuerySvc.queryRecords(VclQueryRecordType.VAPPTEMPLATE, templateQueryParams);
var resolvedVAppTemplatesArray = [];

System.log("Initiating vApp Template discovery across all result pages...");

while (pagedResultSet !== null) {
    var currentBatchRecords = pagedResultSet.getRecords(new VclQueryResultVAppTemplateRecord());
    
    var i;
    for (i = 0; i < currentBatchRecords.length; i++) {
        var templateRecord = currentBatchRecords[i];
        
        // Construct reference for full entity retrieval
        var templateRef = new VclReference();
        templateRef.href = templateRecord.href;
        templateRef.name = templateRecord.name;
        templateRef.type = templateRecord.type;
        
        var fullTemplateEntity = vcloudHostHandle.getEntityByReference(VclFinderType.VAPP_TEMPLATE, templateRef);
        
        if (fullTemplateEntity) {
            resolvedVAppTemplatesArray.push(fullTemplateEntity);
        } else {
            System.warn("Resolution Warning: Failed to retrieve full entity for template record '" + templateRecord.name + "'");
        }
    }
    
    // Advance to next page
    pagedResultSet = pagedResultSet.getNextPage();
}

// Phase 3: Finalize Discovery and Summary Logging
System.log("Template Discovery finalized. Total items resolved: " + resolvedVAppTemplatesArray.length);

var j;
for (j = 0; j < resolvedVAppTemplatesArray.length; j++) {
    var summaryItem = resolvedVAppTemplatesArray[j];
    System.debug(" -> Refined Template: " + summaryItem.name + " [ID: " + summaryItem.id + "]");
}

return resolvedVAppTemplatesArray;
