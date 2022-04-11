var strJson;
	strJson = '{"canonical":"' + strCName + '","name":"' + strARecord + '"}';

try
{
	var objRESTOperation;
		objRESTOperation = new RESTOperation("RESTOperation");
		objRESTOperation.defaultContentType = "application/json";
		objRESTOperation.method = "POST";
		objRESTOperation.urlTemplate = "/wapi/v1.1/record:cname";
		objRESTOperation.host = objRESTHost;

	var objRESTRequest;
		objRESTRequest = objRESTOperation.createRequest(null, strJson);
		objRESTRequest.contentType = "application/json";
		objRESTRequest.setHeader("Accept", "application/json");

	var objRESTResponse;
		objRESTResponse = objRESTRequest.execute();

	var intStatusCode;
		intStatusCode = objRESTResponse.statusCode;

	var objJSON;
		objJSON = JSON.parse(objRESTResponse.contentAsString);		

	if ( intStatusCode == 201 )
	{
		System.log("Successfully Added a CName Record for : '" + strCName + "' pointing to '" + strARecord + "' into InfoBlox.");
	}
	else
	{
		var strError = objJSON.Error;
		var strCode = objJSON.code;
		var strText = objJSON.text;

		System.warn("HTTP Error: " + intStatusCode + ", " + strText);
	}
}
catch (objException)
{
	System.error("objException = " + objException);
}
