/**
 * Searches for a vCloud Director Admin VDC and its associated Organization VDC Network by name.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VCloud:Host} vcloudHostHandle - The vCloud host object.
 * @param {string} targetVdcNameStr - The name of the Virtual Data Center to find.
 * @param {string} targetNetworkNameStr - The name of the Network to find within the VDC.
 * @returns {void}
 */

// Phase 1: Construct Query Criteria for Admin VDC
var vdcNameExpression = new VclExpression(VclQueryAdminVdcField.NAME, targetVdcNameStr, VclExpressionType.EQUALS);
var vdcEnabledExpression = new VclExpression(VclQueryAdminVdcField.ISENABLED, true, VclExpressionType.EQUALS);
var nonSystemVdcExpression = new VclExpression(VclQueryAdminVdcField.ISSYSTEMVDC, false, VclExpressionType.EQUALS);

var queryExpressionsList = [vdcNameExpression, vdcEnabledExpression, nonSystemVdcExpression];
var vdcQueryFilter = new VclFilter(queryExpressionsList, VclFilterType.AND);

var selectFieldsList = [VclQueryOrgVdcField.NAME];

var vdcQueryParams = new VclQueryParams();
vdcQueryParams.setFilter(vdcQueryFilter);
vdcQueryParams.setFields(selectFieldsList);

// Phase 2: Execute Query via vCD Query Service
var vcloudQuerySvc = vcloudHostHandle.getQueryService();
var vdcResultSet = vcloudQuerySvc.queryRecords(VclQueryRecordType.ADMINORGVDC, vdcQueryParams);

if (!vdcResultSet || vdcResultSet.getTotal() === 0) {
    var errorMsg = "Resolution Error: No matching enabled Organizational Virtual Data Center found for '" + targetVdcNameStr + "'";
    System.error(errorMsg);
    throw errorMsg;
}

// Phase 3: Process Query Results
var adminVdcRecordsList = vdcResultSet.getRecords(new VclQueryResultAdminVdcRecord());

var i;
for (i = 0; i < adminVdcRecordsList.length; i++) {
    var adminVdcRecordItem = adminVdcRecordsList[i];
    
    // Resolve full Admin VDC entity from record reference
    var vdcReference = new VclReference();
    vdcReference.href = adminVdcRecordItem.href;
    vdcReference.name = adminVdcRecordItem.name;

    var adminVdcEntity = vcloudHostHandle.getEntityByReference(VclFinderType.ADMIN_VDC, vdcReference);
    var userVdcEntity = adminVdcEntity.toUserObject();

    if (!userVdcEntity) {
        System.warn("VDC Mapping Warning: Could not resolve user-context object for VDC '" + adminVdcRecordItem.name + "'");
        continue;
    }

    System.log("Iterating Org VDC: " + userVdcEntity.name + " [Org: " + (userVdcEntity.parent ? userVdcEntity.parent.name : "Unknown") + "]");

    // Phase 4: Enumerate and Match Networks within the discovered VDC
    var vdcNetworksArray = userVdcEntity.getOrgVdcNetworks();
    var foundNetworkMatch = null;

    var j;
    for (j = 0; j < vdcNetworksArray.length; j++) {
        var currentNetworkObj = vdcNetworksArray[j];
        
        if (currentNetworkObj.name.toUpperCase() === targetNetworkNameStr.toUpperCase()) {
            System.log("Successfully matched Network: " + currentNetworkObj.name + " (ID: " + currentNetworkObj.id + ")");
            foundNetworkMatch = currentNetworkObj;
            break;
        }
    }

    if (!foundNetworkMatch) {
        System.error("Network Resolution Error: Could not find network '" + targetNetworkNameStr + "' within VDC '" + userVdcEntity.name + "'");
    }
}

return null;
