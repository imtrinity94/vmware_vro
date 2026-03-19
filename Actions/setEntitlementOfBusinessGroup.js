/**
 * Updates the status of a named Catalog Entitlement associated with a Business Group in vRealize Automation.
 * Sets the status to either "ACTIVE" or "INACTIVE". "DRAFT" is not allowed.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:Subtenant} cafeBusinessGroup - The Business Group (Subtenant) object.
 * @param {string} targetEntitlementName - The name of the entitlement to update.
 * @param {string} newEntitlementStatus - The new status to apply ("ACTIVE" or "INACTIVE").
 * @returns {void}
 */

var cafeHost = vCACCAFEEntitiesFinder.getHostForEntity(cafeBusinessGroup);
var cafeCatalogClient = cafeHost.createCatalogClient();
var cafeEntitlementSvc = cafeCatalogClient.getCatalogEntitlementService();

System.log("Quering entitlements for Business Group ID: " + cafeBusinessGroup.id);

var orgFilter = vCACCAFEFilterParam.equal("organization/subTenant/id", vCACCAFEFilterParam.string(cafeBusinessGroup.id));
var cafeQuery = vCACCAFEOdataQuery.query().addFilter([orgFilter]);
var cafeOdataRequest = new vCACCAFEPageOdataRequest(cafeQuery);
var entitlementsList = cafeEntitlementSvc.get(cafeHost.tenant, cafeOdataRequest);

var isEntitlementFound = false;
var i;
for (i = 0; i < entitlementsList.length; i++) {
    var entitlementItem = entitlementsList[i];
    
    if (entitlementItem.name === targetEntitlementName) {
        System.log("Matched Entitlement: " + entitlementItem.name);
        System.log("Current Status: " + entitlementItem.status.value() + " -> Transitioning to: " + newEntitlementStatus);
        
        try {
            entitlementItem.setStatus(vCACCAFEEntitlementStatus.fromValue(newEntitlementStatus));
            cafeEntitlementSvc.update(entitlementItem);
            isEntitlementFound = true;
            System.log("Successfully updated entitlement status.");
        } catch (updateEx) {
            System.error("Failed to update entitlement " + targetEntitlementName + ". Error: " + updateEx);
        }
        break; 
    }
}

if (!isEntitlementFound) {
    System.warn("Entitlement '" + targetEntitlementName + "' was not found for Business Group '" + cafeBusinessGroup.name + "'. No changes made.");
}

return null;
