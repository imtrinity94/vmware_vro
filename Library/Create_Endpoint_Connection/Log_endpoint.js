/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint
 */
var text = "Infoblox IPAM endpoint:"
text += "\n\tEndpoint.Id: " + Endpoint.Id;
text += "\n\tEndpoint.URL: " + Endpoint.URL;
text += "\n\tEndpoint.Username: " + Endpoint.Username;

System.log(text);

if (Endpoint.Properties != null
	&& Endpoint.Properties != undefined
	&& Endpoint.Properties.keys != null
	&& Endpoint.Properties.keys != undefined
	&& Endpoint.Properties.keys.length > 0) {
	
	var text = "Endpoint properties:"
	
	var array = new Array();

	for each (var key in Endpoint.Properties.keys) {
		if (key.indexOf("Password") != -1)
			continue;
		array.push(key + ": " + Endpoint.Properties.get(key));
	}

	array.sort();

	for each (var line in array) {
		text += "\n\t" + line;
	}

	System.log(text);

} else {
	System.log("Infoblox IPAM endpoint properties are not specified.");
}
