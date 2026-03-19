/**
 * @description Configures vCloud Director Organization Federation (SAML) settings by:
 *              1. Authenticating to the vCD API and retrieving an x-vcloud-authorization token.
 *              2. Submitting an OrgFederationSettings XML payload via REST PUT.
 *              3. Retrieving all Role references for the organization.
 *              4. Creating a SAML provider group linked to the "Defer to Identity Provider" role.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string} Site_Name - The identifier for the target datacenter site.
 * @param {string} DATACENTER1 - The name constant for datacenter 1.
 * @param {string} DATACENTER2 - The name constant for datacenter 2.
 * @param {REST:RESTHost} DC1_vCDHOST - REST host for datacenter 1's vCD instance.
 * @param {REST:RESTHost} DC2_vCDHOST - REST host for datacenter 2's vCD instance.
 * @param {string} vCD_RestAPI_Username - The vCD API username.
 * @param {string} vCD_RestAPI_Password - The vCD API password.
 * @param {string} Org_Identifier - The vCD organization UUID.
 * @param {string} Tenant_Name - The tenant/organization display name.
 * @param {string} SAML_Metadata - The SAML metadata XML fragment to embed in the federation settings.
 * @returns {void}
 */

System.log("Start Organization federation");

var vCD_API_URL = "";
var vCD_UserName = vCD_RestAPI_Username;
var vCD_Password = vCD_RestAPI_Password;

if (DATACENTER1 == Site_Name) {
    vCD_API_URL = DC1_vCDHOST.url.split(":443")[0];
} else if (DATACENTER2 == Site_Name) {
    vCD_API_URL = DC2_vCDHOST.url.split(":443")[0];
}

var header = '[{"key":"Accept","value":"application/*;version=27.0"}]';
var sessionResponse = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, "api/sessions", "POST", "", header);
var sessionid = "";
if (System.getModule("com.mayank").getHttpOperationStatus(sessionResponse.statusCode)) {
    sessionid = sessionResponse.getHeaderValues('x-vcloud-authorization');
}
if (sessionid == "") {
    throw new Error("Empty session id is received");
}

header = '[{"key":"Accept","value":"application/*;version=27.0"},{"key":"x-vcloud-authorization","value":"' + sessionid + '"},{"key":"Content-Type","value":"application/vnd.vmware.admin.organizationFederationSettings+xml"}]';

var organization_identifier = Org_Identifier;

var OrgFederationSettingValue = '<?xml version="1.0" encoding="UTF-8"?>' +
    +'<OrgFederationSettings xmlns="http://www.vmware.com/vcloud/v1.5" href=vCD_API_URL+"api/admin/org/organization_identifier/settings/federation"" +"type="application/vnd.vmware.admin.organizationFederationSettings+xml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.vmware.com/vcloud/v1.5"+ "+vCD_API_URL+"api/v1.5/schema/master.xsd"> <Link rel="up" href=vCD_API_URL+"api/admin/org/organization_identifier/settings" type="application/vnd.vmware.admin.organization+xml"/> <Link rel="edit" href=vCD_API_URL+"api/admin/org/organization_identifier/settings/federation" type="application/vnd.vmware.admin.organizationFederationSettings+xml"/>'
    + '<Link rel="federation:regenerateFederationCertificate" href=vCD_API_URL+"api/admin/org/organization_identifier/settings/federation/action/regenerateFederationCertificate"/>'
    + SAML_Metadata
    + '<Enabled>true</Enabled> <SamlSPEntityId>OrganizationEntityId</SamlSPEntityId><RoleAttributeName>VCD_Role_Name</RoleAttributeName>'
    + '</OrgFederationSettings>';

var fed_Body = OrgFederationSettingValue;
if (!fed_Body) {
    System.debug("SAML_Metadata is empty");
}
fed_Body = fed_Body.replace(/OrganizationEntityId/g, Tenant_Name + '-' + Site_Name);
fed_Body = fed_Body.replace(/organization_identifier/g, organization_identifier);
var fed_Request = "api/admin/org/" + organization_identifier + "/settings/federation";
var fedResponse = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, fed_Request, "PUT", fed_Body, header);

// Get all the role references
var roleArray = [];
var org_Request = "api/admin/org/" + organization_identifier;
var org_Response = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, org_Request, "GET", "", header);
if (System.getModule("com.mayank").getHttpOperationStatus(org_Response.statusCode)) {
    var orgData = System.getModule("com.vmware.library.http-rest").xml2json(org_Response.contentAsString);
    //var parts;
    if (orgData.AdminOrg.RoleReferences.RoleReference) {
        for each (var roleReferences in orgData.AdminOrg.RoleReferences.RoleReference) {
            var parts = roleReferences.href.split('/');
            if (parts.length > 0) {
                roleArray[roleReferences.name] = parts.pop();
            }
        }
    }
}

// Creating groups
//System.debug("roleArray.length : "+roleArray.length);
if (true /*roleArray.length > 0 */) {
    header = '[{"key":"Accept","value":"application/*;version=27.0"},{"key":"x-vcloud-authorization","value":"' + sessionid + '"},{"key":"Content-Type","value":"application/vnd.vmware.admin.group+xml"}]';
    var group_Request = 'api/admin/org/' + organization_identifier + '/groups';
    var group_Body = '<?xml version="1.0" encoding="UTF-8"?><Group xmlns="http://www.vmware.com/vcloud/v1.5" name="' + Tenant_Name + '" type="application/vnd.vmware.admin.group+xml"><Description/><NameInSource>' + Tenant_Name + '</NameInSource><UsersList/><ProviderType>SAML</ProviderType><Role href="' + vCD_API_URL + 'api/admin/role/' + roleArray["Defer to Identity Provider"] + '" name="Defer to Identity Provider" type="application/vnd.vmware.admin.role+xml"/></Group>';
    var group_Response = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, group_Request, "POST", group_Body, header);
    if (System.getModule("com.mayank").getHttpOperationStatus(group_Response.statusCode)) {
        System.debug("Created groups!");
    } else {
        System.debug("Unable to create group!");
    }
} else {
    System.debug("roleArray.length lenght is 0 so unable to create group!");
}

System.log("End Organization federation");
