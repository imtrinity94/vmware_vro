/**
 * getVASAStatus
 *
 * @param {StoreServ:Connection} connection
 * @return {string} url
 */
var obj = System.getModule("com.hpe.storeserv.vasa").queryVASAStatus(connection);

if (obj != undefined)
{
	var prop = new Properties(obj);
	var service = prop.get("service");

	if(service === "Enabled")
	{
		url = prop.get("vasa_API2_URL");
		
	}
	else
		throw "StoreServ VASA is disabled";
} else {
	throw "Getting VASA status failed";
}
