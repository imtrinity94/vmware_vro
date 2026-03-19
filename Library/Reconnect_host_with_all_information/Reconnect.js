/**
 * Reconnect
 *
 * @param {boolean} force
 * @param {string} hostName
 * @param {string} userName
 * @param {SecureString} password
 * @param {VC:VmFolder} vmFolder
 * @param {VC:HostSystem} host
 * @return {VC:Task} task
 */
if (force == null) force = false;
	
var hostConnectSpec = new VcHostConnectSpec();
hostConnectSpec.force = force;
hostConnectSpec.hostName = hostName;
hostConnectSpec.userName = userName;
hostConnectSpec.password = password;
if (vmFolder != null) hostConnectSpec.vmFolder = vmFolder.reference;

task = host.reconnectHost_Task(hostConnectSpec);