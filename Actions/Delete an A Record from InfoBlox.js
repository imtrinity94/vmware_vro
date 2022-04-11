try
{
	var objRESTOperation;
		objRESTOperation = new RESTOperation("RESTOperation");
		objRESTOperation.defaultContentType = "application/json";
		objRESTOperation.method = "GET";
		objRESTOperation.urlTemplate = "/wapi/v1.1/record:host?_return_type=json&name=" + strARecord;
		objRESTOperation.host = objRESTHost_InfoBlox;

	var objRESTRequest;
		objRESTRequest = objRESTOperation.createRequest([], null);
		objRESTRequest.contentType = "application/json";
		objRESTRequest.setHeader("Accept", "application/json");

	var objRESTResponse;
		objRESTResponse = objRESTRequest.execute();

	var intStatusCode;
		intStatusCode = objRESTResponse.statusCode;

	if ( intStatusCode == 200 )
	{
		var strContentAsString;
			strContentAsString = objRESTResponse.contentAsString;

		try
		{
			var objJson;
				objJson = JSON.parse(strContentAsString);

			var arrRecords;
				arrRecords = objJson;

			var objRegExp;
				objRegExp = /(record:(cname|a|host|mx|ptr|txt))\/([A-Za-z0-9]+):([a-z0-9\-\.]+)\/default/;

			System.log("==================================================");

			for ( var iiii = 0; iiii < arrRecords.length; iiii++ )
			{
				var objRecord;
					objRecord = arrRecords[iiii];

				var strRecordReference;
					strRecordReference = objRecord._ref;

				System.log("===== RECORD REFERENCE: " + strRecordReference);	

				var strRecordCanonical;
					strRecordCanonical = objRecord.canonical;

				System.log("===== RECORD CANONICAL: " + strRecordCanonical);	

				var strRecordName;
					strRecordName = objRecord.name;

				System.log("===== RECORD NAME: " + strRecordName);	

				var arrRecordReference;
					arrRecordReference = objRegExp.exec(strRecordReference);

				var strObjectType;
					strObjectType = arrRecordReference[1];

				System.log("===== OBJECT TYPE: " + strObjectType);	

				var strObjectReference;
					strObjectReference = arrRecordReference[3];

				System.log("===== OBJECT REFERENCE: " + strObjectReference);	

				var strObjectName;
					strObjectName = arrRecordReference[4];

				System.log("===== OBJECT NAME: " + strObjectName);

				if ( strObjectName == strARecord )
				{
					var objRESTOperation;
						objRESTOperation = new RESTOperation("RESTOperation");
						objRESTOperation.defaultContentType = "application/json";
						objRESTOperation.method = "DELETE";
						objRESTOperation.urlTemplate = "/wapi/v1.1/record:host/" + strObjectReference + "?_return_type=json";
						objRESTOperation.host = objRESTHost_InfoBlox;

					var objRESTRequest;
						objRESTRequest = objRESTOperation.createRequest([], null);
						objRESTRequest.contentType = "application/json";
						objRESTRequest.setHeader("Accept", "application/json");										

					System.log("===== ATTEMPTING To DELETE A RECORD: " + strObjectName);	

					var objRESTResponse;
						objRESTResponse = objRESTRequest.execute();

					if ( objRESTResponse.statusCode == 200 )
					{
						System.log("===== SUCCESSFULLY DELETED A RECORD: " + strObjectName);	
					}
					else
					{
						System.error("===== HTTP Error: " + objRESTResponse.statusCode);
						throw "HTTP Error: " + objRESTResponse.statusCode;				
					}

					break;
				}			
			}

			System.log("==================================================");
		}
		catch ( objException )
		{
			System.error("===== JSON Error: " + objException);
			throw "JSON Error: " + objException.code;
		}
	}
	else
	{
		System.error("===== HTTP Error: " + objRESTResponse.statusCode);
		throw "HTTP Error: " + objRESTResponse.statusCode;
	}
}
catch (objException)
{
	System.error("objException = " + objException);
}
