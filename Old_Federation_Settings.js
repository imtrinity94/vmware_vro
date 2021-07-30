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
var sessionid="";
if(System.getModule("com.mayank").getHttpOperationStatus(sessionResponse.statusCode)){
    sessionid = sessionResponse.getHeaderValues('x-vcloud-authorization');
}
if (sessionid == "") {
	throw new Error( "Empty session id is received") ;
}

header = '[{"key":"Accept","value":"application/*;version=27.0"},{"key":"x-vcloud-authorization","value":"' + sessionid + '"},{"key":"Content-Type","value":"application/vnd.vmware.admin.organizationFederationSettings+xml"}]';

var organization_identifier = Org_Identifier;



var OrgFederationSettingValue = '<?xml version="1.0" encoding="UTF-8"?>'+
+'<OrgFederationSettings xmlns="http://www.vmware.com/vcloud/v1.5" href=vCD_API_URL+"api/admin/org/organization_identifier/settings/federation"" +"type="application/vnd.vmware.admin.organizationFederationSettings+xml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.vmware.com/vcloud/v1.5"+ "+vCD_API_URL+"api/v1.5/schema/master.xsd"> <Link rel="up" href=vCD_API_URL+"api/admin/org/organization_identifier/settings" type="application/vnd.vmware.admin.organization+xml"/> <Link rel="edit" href=vCD_API_URL+"api/admin/org/organization_identifier/settings/federation" type="application/vnd.vmware.admin.organizationFederationSettings+xml"/>'
+'<Link rel="federation:regenerateFederationCertificate" href=vCD_API_URL+"api/admin/org/organization_identifier/settings/federation/action/regenerateFederationCertificate"/>'
SAML_Metadata
+'<Enabled>true</Enabled> <SamlSPEntityId>OrganizationEntityId</SamlSPEntityId><RoleAttributeName>VCD_Role_Name</RoleAttributeName>'
+'</OrgFederationSettings>';

var fed_Body = OrgFederationSettingValue;
if (!fed_Body) {
	System.debug( "SAML_Metadata is empty") ;
}
fed_Body = fed_Body.replace(/OrganizationEntityId/g, Tenant_Name + '-' + Site_Name);
fed_Body = fed_Body.replace(/organization_identifier/g, organization_identifier);
var fed_Request = "api/admin/org/" + organization_identifier + "/settings/federation";
var fedResponse = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, fed_Request, "PUT", fed_Body, header);

// get all the role references
var roleArray = [];
var org_Request = "api/admin/org/" + organization_identifier;
var org_Response = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, org_Request, "GET", "", header);
if(System.getModule("com.mayank").getHttpOperationStatus(org_Response.statusCode)){
	var orgData = System.getModule("com.vmware.library.http-rest").xml2json(org_Response.contentAsString);
	//var parts;
	if (orgData.AdminOrg.RoleReferences.RoleReference) {
		for each(var roleReferences in orgData.AdminOrg.RoleReferences.RoleReference) {
			var parts = roleReferences.href.split('/');	
			if (parts.length > 0) {
				roleArray[roleReferences.name] = parts.pop();
			}
		}
	}
}

// creating groups
//System.debug("roleArray.length : "+roleArray.length);
if ( true /*roleArray.length > 0 */) {
    header = '[{"key":"Accept","value":"application/*;version=27.0"},{"key":"x-vcloud-authorization","value":"' + sessionid + '"},{"key":"Content-Type","value":"application/vnd.vmware.admin.group+xml"}]';
    var group_Request = 'api/admin/org/' + organization_identifier + '/groups';
    var group_Body = '<?xml version="1.0" encoding="UTF-8"?><Group xmlns="http://www.vmware.com/vcloud/v1.5" name="' + Tenant_Name + '" type="application/vnd.vmware.admin.group+xml"><Description/><NameInSource>' + Tenant_Name + '</NameInSource><UsersList/><ProviderType>SAML</ProviderType><Role href="' + vCD_API_URL + 'api/admin/role/' + roleArray["Defer to Identity Provider"] + '" name="Defer to Identity Provider" type="application/vnd.vmware.admin.role+xml"/></Group>';
    var group_Response = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, group_Request, "POST", group_Body, header);
	if(System.getModule("com.mayank").getHttpOperationStatus(group_Response.statusCode)){
		System.debug("Created groups!");
	}
	else{
		System.debug("Unable to create group!");
	}
} else {
	System.debug("roleArray.length lenght is 0 so unable to create group!") ;
}

System.log("End Organization federation");
