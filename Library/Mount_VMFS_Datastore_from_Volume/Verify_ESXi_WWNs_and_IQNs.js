/**
 * Verify ESXi WWNs and IQNs
 *
 * @param {Array/VC:HostSystem} hosts
 * @param {StoreServ:Connection} connection
 * @return {Array/StoreServ:Host} storeservhosts
 */
System.log("Verifying Esxi Host's WWNs and IQNs.");
if(!hosts) throw "Esxi Hosts must not be empty";
storeservhosts = new Array();

System.log("Found " + hosts.length + " ESXi hosts in the cluster");
 
for (hostCount = 0; hostCount < hosts.length; hostCount++) {
	System.log("Finding WWNs/IQNs for ESXi host named " + hosts[hostCount].name);
	
	var hostStorageSystem = VcPlugin.toManagedObject( hosts[hostCount], hosts[hostCount].configManager.storageSystem );
	var hostBusAdapters = hostStorageSystem.storageDeviceInfo.hostBusAdapter;
	var wwn;	
	var iqn;
		
	if ( hostBusAdapters != null  &&  hostBusAdapters.length > 0 )  {
		System.log( "Found " + hostBusAdapters.length + " storage adapters." );
		for(var hbaCount=0; hbaCount < hostBusAdapters.length; hbaCount++ )  {
			wwn = hostBusAdapters[hbaCount].portWorldWideNameHex;
			if(wwn) {
				System.log( "Device: " + hostBusAdapters[hbaCount].device + " Model: " + hostBusAdapters[hbaCount].model);
				System.log( "WWN: " + wwn);				
				var wwnHost = System.getModule("com.hpe.storeserv.host").queryHostByFCWWN(connection,wwn.replace(/:/g,'')) ;
				if((wwnHost != undefined) && (wwnHost != null) && (wwnHost.name != null) ) {
					if(storeservhosts) {
						var hosFound = false;
						for (var k = 0; k < storeservhosts.length; k++)
						{	
							if(storeservhosts[k].name == wwnHost.name) {
								hosFound = true;
								break;
							}				
						}
						if(hosFound == false) {
							storeservhosts.push(wwnHost);
							System.debug("Host name : " + wwnHost.name);
						}						
					}		
				}
			}
			
			
			iqn = hostBusAdapters[hbaCount].iScsiName;
			if(iqn) {
				System.log( "Device: " + hostBusAdapters[hbaCount].device + " Model: " + hostBusAdapters[hbaCount].model);
				System.log( "IQN: " + iqn);				
				var iqnHost = System.getModule("com.hpe.storeserv.host").queryHostByiSCSIName(connection,iqn) ;
				if((iqnHost != undefined) && (iqnHost != null) && (iqnHost.name != null) ) {					
					if(storeservhosts) {
						var hostFound = false;
						for (var k = 0; k < storeservhosts.length; k++)
						{	
							if(storeservhosts[k].name == iqnHost.name) {
								hostFound = true;
								break;
							}				
						}
						if(hostFound == false) {
							storeservhosts.push(iqnHost);
							System.debug("Host name : " + iqnHost.name);
						}						
					}		
				}
			}
		}
	}
	else  {
		System.log( "No storage adapters found" );
	}	
}

if (storeservhosts != undefined && storeservhosts != null && storeservhosts.length) {
	System.log("Matching hosts found for all ESXi servers. The following hosts are found on the 3PAR:");	
	for(var hostListCount=0; hostListCount < storeservhosts.length; hostListCount++ ) {
		System.log(storeservhosts[hostListCount].name);
	}
}else {
	throw "No matching hosts found for ESXi servers";
}

