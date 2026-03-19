/**
 * Verifies ESXi WWNs
 *
 * @param {Array/VC:HostSystem} hosts - [object Object]
 * @param {Array/PS:Host} result - [object Object]
 * @return {Array/string} hostResults
 */
System.log("Verifying Esxi Host's WWNs and IQNs.");
if(!hosts) throw "Esxi Hosts must not be empty";
if(!result) throw "FlashArray Hosts must not be empty";

hostResults = [];

System.log("Found " + hosts.length + " ESXi hosts in the cluster");
 
for (hostCount = 0; hostCount < hosts.length; hostCount++) {
	System.log("Finding WWNs/IQNs for ESXi host named " + hosts[hostCount].name);
	
	var hostStorageSystem = VcPlugin.toManagedObject( hosts[hostCount], hosts[hostCount].configManager.storageSystem );
	var hostBusAdapters = hostStorageSystem.storageDeviceInfo.hostBusAdapter;
	var wwn;
	var hostWwns = [];
	var iqn;
	var hostIqns = [];
	if ( hostBusAdapters != null  &&  hostBusAdapters.length > 0 )  {
		System.log( "Found " + hostBusAdapters.length + " storage adapters." );
		for(var hbaCount=0; hbaCount < hostBusAdapters.length; hbaCount++ )  {
			wwn = hostBusAdapters[hbaCount].portWorldWideNameHex;
			if(wwn) {
				System.log( "Device: " + hostBusAdapters[hbaCount].device + " Model: " + hostBusAdapters[hbaCount].model);
				System.log( "WWN: " + wwn);
				hostWwns.push(wwn.replace(/:/g,''));
			}
			
			
			iqn = hostBusAdapters[hbaCount].iScsiName;
			if(iqn) {
				System.log( "Device: " + hostBusAdapters[hbaCount].device + " Model: " + hostBusAdapters[hbaCount].model);
				System.log( "IQN: " + iqn);
				hostIqns.push(iqn);
			}
		}
	}
	else  {
		System.log( "No storage adapters found" );
	}
	//find host on FlashArray with wwns and iqns
	var hostName = null;
	var index;
	
	//check for wwns
	for(index = 0; index < hostWwns.length; index++) {
		for (var faHostIndex = 0; faHostIndex < result.length; faHostIndex++) {
			if(result[faHostIndex].wwn) {
				if(result[faHostIndex].wwn.indexOf(hostWwns[index].toUpperCase()) > -1) {
					System.debug("FlashArray Host: "+ result[faHostIndex].name +" found for wwn: "+ hostWwns[index]);
					if(!hostName) {
						hostName = result[faHostIndex].name;
					}
					else if(hostName != result[faHostIndex].name){
						logHostError(result[faHostIndex].name);
					}
				}
			}
		}
	} 
	
	//check for iqns
	for(index = 0; index < hostIqns.length; index++) {
		for (var faHostIndex = 0; faHostIndex < result.length; faHostIndex++) {
			if(result[faHostIndex].iqn) {
				if(result[faHostIndex].iqn.indexOf(hostIqns[index]) > -1) {
					if(!hostName) {
						hostName = result[faHostIndex].name;
					}
					else if(hostName !== result[faHostIndex].name){
						logHostError(result[faHostIndex].name);
					}
				}
			}
		}
	} 
	
if(hostName) {
	hostResults.push(hostName);
}
	
}
System.log("Matching hosts found for all ESXi servers. The following hosts are found on the FlashArray:");

for(var hostListCount=0; hostListCount < hostResults.length; hostListCount++ ) {
	System.log(hostResults[hostListCount]);
}

function logHostError(wrongHostName) {
		var hostError = "The host named " +  wrongHostName + " is misconfigured on the FlashArray. ESXi WWNs/IQNs are assigned to more than one host object on the FlashArray. Cannot continue."
		System.error(hostError);
		throw (hostError);
}