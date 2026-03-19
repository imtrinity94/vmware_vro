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
					System.debug("FlashArray Host: "+ result[faHostIndex].name +" found for iqn: "+ hostIqns[index]);
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


/* Old .. Only for WWNs
var hostResults = [];
System.log("Found " + hosts.length + " ESXi hosts in the cluster");
for (esxiCount = 0; esxiCount <hosts.length; esxiCount++)
{
	System.log(hosts[esxiCount].name);
} 
for (hostCount = 0; hostCount < hosts.length; hostCount++) 
{
	System.log("Finding FC WWNs for ESXi host named " + hosts[hostCount].name);
	var hostName = null;
	var hostStorageSystem = VcPlugin.toManagedObject( hosts[hostCount], hosts[hostCount].configManager.storageSystem );
	var hostBusAdapters = hostStorageSystem.storageDeviceInfo.hostBusAdapter;
	var wwn;
	var hostWwns = [];
	if ( hostBusAdapters != null  &&  hostBusAdapters.length > 0 )  
	{
		System.log( "Found " + hostBusAdapters.length + " storage adapters." );
		for(var hbaCount=0; hbaCount < hostBusAdapters.length; hbaCount++ )  
		{
			wwn = hostBusAdapters[hbaCount].portWorldWideNameHex;
			if(wwn !== undefined){System.log( "Device: " + hostBusAdapters[hbaCount].device + " Model: " + hostBusAdapters[hbaCount].model)};
			if(wwn !== undefined){System.log( "WWN: " + wwn)};
			if(wwn !== undefined){hostWwns.push(wwn.replace(/:/g,''))};
		}
	}
	else  
	{
		System.log( "No storage adapters found" );
	}
		for(var hostWwnCount=0; hostWwnCount < hostWwns.length; hostWwnCount++ )  
	{
		System.log( "Host WWN " + hostWwnCount + ": " + hostWwns[hostWwnCount]);
	}
	for (flasharrayHosts = 0; flasharrayHosts < result.length; flasharrayHosts++) 
	{
		for (wwnCount = 0; wwnCount < result[flasharrayHosts].wwn.length; wwnCount++) 
		{
			for(hostWwnCount=0; hostWwnCount < hostWwns.length; hostWwnCount++ )  
			{
				if(result[flasharrayHosts].wwn[wwnCount] == hostWwns[hostWwnCount].toUpperCase())
				{
					System.log(result[flasharrayHosts].name);
					if (hostName == null)
					{
							hostName = result[flasharrayHosts].name;
					}
					if (hostName !== result[flasharrayHosts].name && hostName !== null)
					{
						var hostError = "The host named " +  result[flasharrayHosts].name + " is misconfigured on the FlashArray. ESXi WWNs are assigned to more than one host object on the FlashArray. Cannot continue."
						System.error(hostError);
						throw (hostError);
					}
					System.log(result[flasharrayHosts].wwn[wwnCount]);
				}
			}
		}
			
	} 
	if (hostName == null)
	{
		var hostError = ("No host object is configured on the FlashArray with one or more WWNs from the ESXi host " + hosts[hostCount].name); 
		System.error(hostError);
		throw (hostError);
	}
	else 
	{
		hostResults.push(hostName);
	}
}
System.log("Matching hosts found for all ESXi servers. The following hosts are found on the FlashArray:");
for(var hostListCount=0; hostListCount < hostResults.length; hostListCount++ )  
{
	System.log(hostResults[hostListCount]);
}

*/