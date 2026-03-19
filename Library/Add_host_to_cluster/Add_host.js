/**
 * Add host
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {boolean} asConnected
 * @param {boolean} force
 * @param {string} hostName
 * @param {number} port
 * @param {string} userName
 * @param {SecureString} password
 * @param {VC:VmFolder} vmFolder
 * @param {VC:ResourcePool} resourcePool
 * @param {string} license
 * @param {boolean} progress
 * @param {number} pollRate
 * @return {VC:Task} task
 */
// define default if params is null
if (asConnected == null) asConnected = true;
if (force == null) force = false;
if (port == null) port = 443;
if (license == "") license = null;

var hostConnectSpec = new VcHostConnectSpec();
hostConnectSpec.force = force;
hostConnectSpec.hostName = hostName;
hostConnectSpec.port = port;
hostConnectSpec.userName = userName;
hostConnectSpec.password = password;
if (vmFolder != null) hostConnectSpec.vmFolder = vmFolder.reference;

// Try to add the host to the cluster
var addHostToClusterTask = cluster.addHost_Task(hostConnectSpec, asConnected, resourcePool, license);

try {
    System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(addHostToClusterTask, progress, pollRate);
} catch (e) {
    //Nothing to do.
}

// If the there is an error and the fault contains thumbprint - take it and try again
if (addHostToClusterTask.info.state == VcTaskInfoState.error &&
        addHostToClusterTask.info.error.fault != null &&
        addHostToClusterTask.info.error.fault.thumbprint != null) {
    hostConnectSpec.sslThumbprint = addHostToClusterTask.info.error.fault.thumbprint;
    task = cluster.addHost_Task(hostConnectSpec, asConnected, resourcePool, license);
} else {
    task = addHostToClusterTask;
}