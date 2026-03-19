/**
 * Create HostGroup with Hosts
 *
 * @param {VC:ClusterComputeResource} cluster - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @param {Properties} hostWithWWNs
 * @param {Properties} hostWithIQNs
 * @return {PS:HostGroup} hostGroupCreated - [object Object]
 */
	System.log("In Script : Create HostGroup with Hosts");
	if(!flashArrayConnection) throw "'flashArrayConnection' parameter should not be empty."
	
	
	var hostGroupName =  cluster.name.replace(/\W/g, '');
	System.log("Creating Host Group with name: " + hostGroupName);

	
	if(hostWithWWNs) {
		System.log( "Hosts with WWNs " + JSON.stringify(hostWithWWNs));
	 }
	
	if(hostWithIQNs) {
		System.log( "Hosts with IQNs " + JSON.stringify(hostWithIQNs));
	 }
	
	var hostList = [];
    var host = [];

	for each (key in hostWithWWNs.keys) {
		System.debug("Adding host name: "+key);
		host.push(key);
	}
	for each (key in hostWithIQNs.keys) {
		System.debug("Checking host name: "+key);
		if(host.indexOf(key) < 0) {
			System.debug("Adding host name: "+key);
			host.push(key);
		}
	}
	//Api call to create host(hostWithWWNs is map of <hostname, List<WWNs> and hostWithIQNs is map of <hostname, List<IQNs>)
	for (var index = 0; index < host.length; index++){
		var wwnList = hostWithWWNs.get(host[index]);
		var iqnList = hostWithIQNs.get(host[index]);
		var hostName = host[index].replace(/\W/g, '');
		System.log("Creating Host '" + hostName + "' with WWNs: " + wwnList + " and IQNs: " + iqnList); 
		var hostCreated = System.getModule("com.purestorage.flasharray.host").createFlashArrayHost(hostName, wwnList, iqnList, flashArrayConnection) ;
		hostList.push(hostCreated);
		System.log("Host with name created " + hostCreated.name); 
		System.debug("Host created " + hostCreated); 
	}


	//Create host group with hostList
	System.log("Creating host group with name: " + hostGroupName);
	hostGroupCreated = System.getModule("com.purestorage.flasharray.hostgroup").createFlashArrayHostGroupWithHostList(flashArrayConnection, hostGroupName, hostList);
	System.debug("Host Group created: " + hostGroupCreated); 