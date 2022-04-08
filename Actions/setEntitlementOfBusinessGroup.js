// VMware vRealize Orchestrator (vRO) action sample
//
// Updates the named Catalog Entitlement associated with a BusinessGroup 
// to either Active or Inactive
// 
// For vRO/vRA 7.0+
//
// Action Inputs:
//  businessGroup  - vCACCAFE:Subtenant
//  entitlementName - string
//  newStatus = string (ACTIVE or INACTIVE - DRAFT is not allowed)
//
// Return type: void
var host = vCACCAFEEntitiesFinder.getHostForEntity(businessGroup);
var cc = host.createCatalogClient();
var ces = cc.getCatalogEntitlementService();

var filters = [vCACCAFEFilterParam.equal("organization/subTenant/id", vCACCAFEFilterParam.string(businessGroup.id))];

var query = vCACCAFEOdataQuery.query().addFilter(filters);
var odataRequest = new vCACCAFEPageOdataRequest(query);
var entitlements = ces.get(host.tenant, odataRequest);

for each (var item in entitlements) {
	if(item.name == entitlementName)
	{
		System.log("Updating entitlement '"+item.name+"' from '"+item.status.value()+"' to '"+newStatus+"'");
		item.setStatus(vCACCAFEEntitlementStatus.fromValue(newStatus));
		ces.update(item);
	}
}
