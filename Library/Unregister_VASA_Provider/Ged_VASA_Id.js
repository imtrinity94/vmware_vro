/**
 * Ged VASA Id
 *
 * @param {VC:SdkConnection} vcenter
 * @param {string} name
 * @return {string} id
 */
var storageService = vcenter.storageManagement;
var smsManager = storageService.smsStorageManager;
var providers = smsManager.queryProvider();
for (var i = 0; i < providers.length; i++)
{
	var provInfo = providers[i].queryProviderInfo();
	if (provInfo.name == name)
	{
		id = provInfo.uid;
		break;
	}
}
if (id == undefined || id == null)
	throw "Given VASA provider \'"+name+ "\' not found";
else
	System.log("VASA provider ID is " + id);