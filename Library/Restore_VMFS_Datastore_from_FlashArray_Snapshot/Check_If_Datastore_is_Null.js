/**
 * Check If Datastore is Null
 *
 * @param {Array/VC:HostSystem} hostsToRescan
 * @param {string} datastoreName
 * @return {VC:Datastore} datastoreOut - [object Object]
 */
var ds = hostsToRescan[0].datastore;
for(var i = 0; i < ds.length; i++)
{
	if(ds[i].name == datastoreName)
	{
		datastoreOut = ds[i];
	}
}
if(datastoreOut == null)
{
		System.debug("Datastore is null");
		throw "Datastore object is null!";
}