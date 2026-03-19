/**
 * Export VV to VVSet
 *
 * @param {StoreServ:Connection} connection
 * @param {Array/StoreServ:HostSet} hostsets
 * @param {Array/StoreServ:Volume} volumes
 * @param {boolean} autolun
 * @param {Array/number} luns
 */
if(!volumes) throw "Virtual Volume information not found";

if(!luns) throw "LUN ID information not found";

if(!hostsets) throw "Host Set information not found";

if((volumes.length != hostsets.length) || (hostsets.length != luns.length) || (luns.length != volumes.length)) {
	throw "Invalid Virtual Volume information";
}

for (var i = 0; i < volumes.length; i++)
{
	var actionResult = System.getModule("com.hpe.storeserv.export").exportVirtualVolumeToHostSet(connection,volumes[i],luns[i],hostsets[i],autolun,null);
	if(!actionResult) {
		System.error("Unable to export Virtual Volume: " + volumes[i].name);
		throw "Unable to export Virtual Volume: " + volumes[i].name;
	}
}