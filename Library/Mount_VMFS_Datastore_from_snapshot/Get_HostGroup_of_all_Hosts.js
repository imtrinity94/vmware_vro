/**
 * Get HostGroup of all Hosts
 *
 * @param {StoreServ:Connection} connection
 * @param {Array/StoreServ:Host} storeservhosts
 * @param {StoreServ:HostSet} hostGroup
 */
var hostset = [];
var hostsets = [];
var finhostsets = [];
var singlehostset;
var duphostset = false;

if (storeservhosts != undefined || storeservhosts != null) {
	for(i = 0; i < storeservhosts.length; i++)
	{
		hostset = System.getModule("com.hpe.storeserv.hostset").queryHostSetBySetmembers(connection, storeservhosts[i]);
		if (hostset != undefined || hostset != null) {
			for(j = 0; j < hostset.length; j++)
			{
				if (hostsets == undefined || hostsets == null) {
					hostsets.push(hostset[j]);
				} else {
					//Aviod duplicate entries
					duphostset = false;
					for(k = 0; k < hostsets.length; k++)
					{
						if (hostsets[k].name == hostset[j].name) {
							duphostset = true;
						}
					}
					if (duphostset == false) {
						hostsets.push(hostset[j]);
					}
				}
			}
		}
	}
}

//Check for exact match or superset but not subset hostsets
var count = 0;
if (hostsets != undefined || hostsets != null) {
	for(k = 0; k < hostsets.length; k++)
	{
		count = 0;
		singlehostset = System.getModule("com.hpe.storeserv.hostset").querySpecificHostSet(connection, hostsets[k].name);
		if (singlehostset != undefined || singlehostset != null) {
			
			for (m = 0; m < storeservhosts.length; m++)
			{
				for (l = 0; l < singlehostset.setmembers.length; l++)
				{
					if (storeservhosts[m].name == singlehostset.setmembers[l]) {
						count = count + 1;		
					}
				}
			}
		}
		if (count >= storeservhosts.length) {
			finhostsets.push(singlehostset);
		}
	}
}

//Check if the provided hostset matches with cluster
var foundmatching = false;
if (finhostsets != undefined || finhostsets != null) {
	for (k = 0; k < finhostsets.length; k++)
	{
		if (finhostsets[k].name == hostGroup.name) {
			foundmatching = true;
		}
	}
}

//Display available hostsets if provided hostset is not matched
var matchinghosts=[];
if (foundmatching == false) {
	if (finhostsets != undefined || finhostsets != null) {
		if (finhostsets.length > 0) {
			for (m = 0; m < finhostsets.length; m++)
			{
				matchinghosts .push(finhostsets[m].name);
			}
			System.log("Host sets matching with cluster member hosts are "+matchinghosts.join(', '));
		}
	}
	throw "hosts in the provided host set doesn't match with the cluster hosts";
}


