/**
 * Get All Storage Policy Names
 *
 * @param {REST:RESTHost} vcHost
 * @param {REST:RESTHost} pbmHost
 * @param {string} vcUsername
 * @param {SecureString} vcPassword
 * @return {Array/string} storagePolicyNames
 */
var loginRequest = <?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<soapenv:Body>
		<Login xmlns="urn:vim25">
			<_this type="SessionManager">SessionManager</_this>
			<userName>{vcUsername}</userName>
			<password>{vcPassword}</password>
		</Login>
	</soapenv:Body>
</soapenv:Envelope>;

System.log("Login into vCenter");

var loginRequest = vcHost.createRequest("POST", "/", loginRequest);
if (loginRequest == null) {
	throw "Can't create login request";
}
loginRequest.setHeader("SOAPAction", "urn:vim25/5.0");
loginRequest.contentType = "txt/xml; charset=utf-8";

/* Execute the login request */
System.log("Connecting to vCenter...");
var loginResponse = loginRequest.execute();
if (loginResponse == null) {
	throw "There isn't login response";
}
var cookie = null;
if(loginResponse.statusCode == 200) {
	System.log("Connected");
	var headers = loginResponse.getAllHeaders();
	var keys = Object.keys(headers);
	for each (var key in keys) {
		if (key.toLowerCase() === "set-cookie") {
			cookie = headers.get(key).split('"')[1];
			System.log("The cookie is: " + cookie);
			break;
		}
	}

	if (cookie == null) {
		throw "Cannot find cookie in the response";
	}
} else {
	System.log(loginResponse.contentAsString);
	throw "Connect to the vCenter failed";
}

var spbmModule = System.getModule("com.vmware.library.spbm");
var policies = spbmModule.getAllStoragePolicies(pbmHost, cookie);
var compatibleDatastore = null
storagePolicyNames = new Array();
for each (var p in policies) {
        compatibleDatastore = spbmModule.getAllDatastoresCompliantWithStoragePolicy(pbmHost, cookie, p.uuid);
        if (compatibleDatastore !== undefined && compatibleDatastore.length != 0) {
  	       storagePolicyNames.push(p.name);
	       System.log("Qualified storage policy : " +  p.name);
	}
}

for each (var name in storagePolicyNames) {
	System.log(name);
}