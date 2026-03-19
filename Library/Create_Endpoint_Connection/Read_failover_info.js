/**
 * Read failover info
 *
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint
 * @return {Array/CompositeType(id:string,index:number,url:string,username:string,password:SecureString,priority:number):ConnectionInfo} attrFailoverEndpoints
 */
var connectionError = "Error connecting to Infoblox IPAM service because connection to basic endpoint failed and endpoints for failover are not specified."
					+ " See the root cause from the warnings printed above in this log. Code: 3002";

if (Endpoint.Properties == null ||
	Endpoint.Properties == undefined ||
	Endpoint.Properties.keys == null ||
	Endpoint.Properties.keys == undefined ||
	Endpoint.Properties.keys.length == 0) {
	throw connectionError;
}

attrFailoverEndpoints = new Array();
var maxFailoverEndpoints = 4;

System.log("Reading custom properties with failover info...");

for (var i = 1; i <= maxFailoverEndpoints ; i++) {
	var id = Endpoint.Id + "-" + i;
	var index = i;
	var hostname = Endpoint.Properties.get(getKey(i, "Hostname"));
	var username = Endpoint.Properties.get(getKey(i, "Username"));
	var password = Endpoint.Properties.get(getKey(i, "Password"));
	//var priority = toNumber(Endpoint.Properties.get(getKey(i, "Priority")));
	var priority = i + 1;

	if (id != null && hostname != null && username != null && password != null
		&& priority != null && !isNaN(priority)) {
		
		var text = "Infoblox IPAM endpoint #" + index + " for failover was found:";
		text += "\n\t" + getKey(i, "Id") + ": " + id;
		text += "\n\t" + getKey(i, "Hostname") + ": " + hostname;
		text += "\n\t" + getKey(i, "Username") + ": " + username;
		text += "\n\t" + getKey(i, "Priority") + ": " + priority;
		System.log(text);

		attrFailoverEndpoints.push({
			id:id,
			index:index,
			url:hostname,
			username:username,
			password:password,
			priority:priority
		});
	}
}

if (attrFailoverEndpoints.length == 0) {
	System.log("Infoblox IPAM endpoints for failover not found.");
	throw connectionError;
}

function getKey(index, name) {
	return "Infoblox.IPAM.Endpoint" + index + "." + name;
}

//function toNumber(str) {
//	if (str) {
//		return parseInt(str);
//	} else {
//		return null;
//	}
//}
