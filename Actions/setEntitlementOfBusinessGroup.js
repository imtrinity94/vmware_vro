/**
 * Updates the status of a named Catalog Entitlement associated with a Business Group in vRealize Automation.
 * Sets the status to either "ACTIVE" or "INACTIVE". "DRAFT" is not allowed.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:Subtenant} businessGroup The Business Group (Subtenant) object.
 * @param {string} entitlementName The name of the entitlement to update.
 * @param {string} newStatus The new status to apply ("ACTIVE" or "INACTIVE").
 * @returns {void}
 */

var host = vCACCAFEEntitiesFinder.getHostForEntity(businessGroup);
var catalogClient = host.createCatalogClient();
var entitlementService = catalogClient.getCatalogEntitlementService();

var filter = vCACCAFEFilterParam.equal("organization/subTenant/id", vCACCAFEFilterParam.string(businessGroup.id));
var query = vCACCAFEOdataQuery.query().addFilter([filter]);
var odataRequest = new vCACCAFEPageOdataRequest(query);
var entitlements = entitlementService.get(host.tenant, odataRequest);

var updated = false;
for each (var item in entitlements) {
    if (item.name == entitlementName) {
        System.log("Updating entitlement '" + item.name + "' from '" + item.status.value() + "' to '" + newStatus + "'");
        item.setStatus(vCACCAFEEntitlementStatus.fromValue(newStatus));
        entitlementService.update(item);
        updated = true;
        break; // Assuming unique name per BG
    }
}

if (!updated) {
    System.warn("Entitlement '" + entitlementName + "' not found for Business Group '" + businessGroup.name + "'");
}
