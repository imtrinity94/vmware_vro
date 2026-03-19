/**
 * Add host
 *
 * @param {VC:HostFolder} hostFolder
 * @param {boolean} addConnected
 * @param {boolean} force
 * @param {string} hostName
 * @param {number} port
 * @param {string} userName
 * @param {SecureString} password
 * @param {VC:VmFolder} vmFolder
 * @param {string} license
 * @param {boolean} progress
 * @param {number} pollRate
 * @return {VC:Task} task
 */
try {
	// define default if params is null
	if (addConnected == null) addConnected = true;
	if (force == null) force = false;
	if (port == null) port = 902;
	if (license == "") license = null;

	var hostConnectSpec = new VcHostConnectSpec();
	hostConnectSpec.force = force;
	hostConnectSpec.hostName = hostName;
	hostConnectSpec.port = port;
	hostConnectSpec.userName = userName;
	hostConnectSpec.password = password;
	if (vmFolder != null) hostConnectSpec.vmFolder = vmFolder.reference;

	// try to add the host
	var addHostTask = hostFolder.addStandaloneHost_Task(hostConnectSpec, null, addConnected, license);

	try {
		System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(addHostTask, progress, pollRate);
	} catch (e) {
		// nothing to do
	}

	// if the there is an error and the fault contains a thumbprint - use it and try again
	if (addHostTask.info.state == VcTaskInfoState.error &&
		addHostTask.info.error.fault != null &&
		addHostTask.info.error.fault.thumbprint != null) {
		hostConnectSpec.sslThumbprint = addHostTask.info.error.fault.thumbprint;
		task = hostFolder.addStandaloneHost_Task(hostConnectSpec, null, addConnected, license);
	} else {
		task = addHostTask;
	}
}
catch (ex) {
	System.error("Cannot add host " + hostName + ". Reason: " + ex);
	Server.error("Cannot add host " + hostName + ". Reason: " + ex);
	tmpErrorMessage = "Cannot add host " + hostName + ". Reason: " + ex;
}