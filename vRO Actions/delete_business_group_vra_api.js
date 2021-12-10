/*
I’ve just written a good example of how to use the restClient() method. The code snippet takes in 3 parameters, 2 inputs and 1 attribute.

Inputs are :

businessGroupToDelete – name of business group
tenant – name of tenant

Attribute:

vcacCafeHost (typeof vCACCAFE:VCACHost) with a value set to the vCAC CAFE host.

I’ve used the vCACCAFEEntitiesFinder to match on the business group name and this is case insensitive. So if the business group name is Corp, input could be CoRp and we get the right case to pass in the API filter, which quickens up the API search.

Then I use a filter in the API call using the BG name returned by the vCACCAFEEntitiesFinder.

I’m really liking using the method for the API and have done more and more coding like this. The vRealize 7 API is well documented and easy to use.


*/

// Getting case of business group name, incase BG passed in is wrong case.
var entity = vCACCAFEEntitiesFinder.findBusinessGroups(vcacCafeHost , businessGroupToDelete)
if (!entity){throw "Could not find business group"};
 
for each (var bg in entity){
 
if (bg.tenantId.toLowerCase() == tenant.toLowerCase()){
System.log("Found the following business group: " + bg.name + " in " + bg.tenantId);
break;
}
}
if (!bg){throw "Could not find business group"};
 
// create rest endpoint for rest client
var endpoint = 'com.vmware.csp.core.cafe.identity.api';
var restClient = vcacCafeHost.createRestClient(endpoint);
var businessGroupUrl = "tenants/" + bg.tenantId + "/subtenants?filter=name eq '" + bg.name + "'";
 
// get business groups
var businessGroups = restClient.get(businessGroupUrl);
var res = businessGroups.getBodyAsString();
 
//clean json and parse
var json = JSON.parse(res.replace(/\\/g, ''));
 
for each (var v in json.content){
 
System.log("Business Group name: " + v.name + " and ID: " + v.id);
 
// match and delete business group by name
try{
if (v.name == bg.name) {
 
var businessGroupUrl = "tenants/" + bg.tenantId + "/subtenants/" + v.id;
System.log("Deleting business group: " + bg.name + " with the follow REST URL: " + businessGroupUrl);
restClient.delete(businessGroupUrl);
System.log("Deleted business group successfully");
break;
}
}
catch(e){
System.log(e);
break;
}
}
 
//System.debug(JSON.stringify(json));
