/**
 * Get Properties
 *
 * @param {Properties} payload
 * @param {string} errorCode
 * @return {string} name
 * @return {string} uuid
 * @return {string} puppetCodeEnvironment
 * @return {SecureString} puppetAutosignSharedSecret
 * @return {SecureString} sshPassword
 * @return {string} puppetRoleClass
 * @return {string} sshUsername
 * @return {string} winRMUsername
 * @return {SecureString} winRMPassword
 * @return {string} factsJSON
 * @return {string} puppetMasterInstallUUID
 * @return {boolean} useSudo
 * @return {boolean} keepFailedVMs
 * @return {boolean} useHTTPS
 * @return {string} puppetAgentAccountUser
 * @return {SecureString} puppetAgentAccountPassword
 * @return {string} puppetAgentAccountDomain
 * @return {string} winRMAuthMethod
 * @return {string} sshKeyPath
 * @return {SecureString} sshPassphrase
 * @return {boolean} isWindows
 * @return {string} puppetNodeCertname
 * @return {string} errorCode
 * @return {string} puppetInstallMaster
 * @return {string} puppetNode
 * @return {string} puppetApptier
 * @return {string} puppetDepartment
 * @return {string} puppetService
 * @return {boolean} ignoreChanges
 */
var properties = {};
try {
  properties["BlueprintName"] = payload.get("blueprintName");
  properties["ComponentId"] = payload.get("componentId");
  properties["ComponentTypeId"] = payload.get("componentTypeId");
  properties["EndpointId"] = payload.get("endpointId");
  properties["RequestId"] = payload.get("requestId");
  properties["VirtualMachineEvent"] = payload.get("virtualMachineEvent");
  properties["WorkflowNextState"] = payload.get("workflowNextState");

  var lifecycleState = payload.get("lifecycleState");
  if (lifecycleState !== null) {
    properties["State"] = lifecycleState.get("state");
    properties["Phase"] = lifecycleState.get("phase");
    properties["Event"] = lifecycleState.get("event");
  }

  var machine = payload.get("machine");
  properties["ID"] = machine.get("id");
  properties["Name"] = machine.get("name");
  properties["ExternalReference"] = machine.get("externalReference");
  properties["Owner"] = machine.get("owner");
  properties["Type"] = machine.get("type");

  var vRAVmProperties = machine.get("properties") ;
  if (vRAVmProperties != null) {
    for each (var key in vRAVmProperties.keys) {
      properties[key] = vRAVmProperties.get(key);
    }
  }

  function redactSensitive(key, value) {
  if (key === 'Puppet.Autosign.SharedSecret'          ||
      key === 'Puppet.Autosign.SharedSecret.Override' ||
      key === 'Puppet.SSH.Password'                   ||
      key === 'Puppet.SSH.Password.Override'          ||
      key === 'Puppet.SSH.Passphrase'                 ||
      key === 'Puppet.SSH.Passphrase.Override'        ||
      key === 'Puppet.WinRM.Password'                 ||
      key === 'Puppet.WinRM.Password.Override'        ||
      key === 'Puppet.Windows.AgentAccountPassword'   ||
      key === 'Puppet.Windows.AgentAccountPassword.Override') {
      value = '***REDACTED***';
    }
    return value;
  }

  factsJSON = JSON.stringify({ "puppet_vra_properties": properties }, redactSensitive, 2);
  System.debug(factsJSON);

  name = machine.get("name");
  uuid = properties["ID"]; //using the vRA machine.id which is actually the IaaS UUID.

  System.log("Provision Puppet Node: Name of VM is " + name + ", and the UUID is " + uuid);

  puppetAutosignSharedSecret = vRAVmProperties.get('Puppet.Autosign.SharedSecret.Override');
  if (puppetAutosignSharedSecret === null || puppetAutosignSharedSecret === "") {
    puppetAutosignSharedSecret = vRAVmProperties.get('Puppet.Autosign.SharedSecret');
  }
  puppetCodeEnvironment = vRAVmProperties.get('Puppet.CodeEnvironment.Override');
  if (puppetCodeEnvironment === null || puppetCodeEnvironment === "") {
    puppetCodeEnvironment = vRAVmProperties.get('Puppet.CodeEnvironment');
  }
  puppetRoleClass = vRAVmProperties.get('Puppet.RoleClass.Override');
  if (puppetRoleClass === null || puppetRoleClass === "") {
    puppetRoleClass = vRAVmProperties.get('Puppet.RoleClass');
  }
  puppetApptier = vRAVmProperties.get('Puppet.Extensions.Apptier.Override');
  if (puppetApptier === null || puppetApptier === "") {
    puppetApptier = vRAVmProperties.get('Puppet.Extensions.Apptier');
  }
  puppetDepartment = vRAVmProperties.get('Puppet.Extensions.Department.Override');
  if (puppetDepartment === null || puppetDepartment === "") {
    puppetDepartment = vRAVmProperties.get('Puppet.Extensions.Department');
  }
  puppetService = vRAVmProperties.get('Puppet.Extensions.Service.Override');
  if (puppetService === null || puppetInstall === "") {
    puppetService = vRAVmProperties.get('Puppet.Extensions.Service');
  }
  sshPassword = vRAVmProperties.get('Puppet.SSH.Password.Override');
  if (sshPassword === null || sshPassword === "") {
    sshPassword = vRAVmProperties.get('Puppet.SSH.Password');
  }
  sshUsername = vRAVmProperties.get('Puppet.SSH.Username.Override');
  if (sshUsername === null || sshUsername === "") {
    sshUsername = vRAVmProperties.get('Puppet.SSH.Username');
  }
  sshKeyPath = vRAVmProperties.get('Puppet.SSH.KeyPath.Override');
  if (sshKeyPath === null || sshKeyPath === "") {
    sshKeyPath = vRAVmProperties.get('Puppet.SSH.KeyPath');
  }
  sshPassphrase = vRAVmProperties.get('Puppet.SSH.Passphrase.Override');
  if (sshPassphrase === null || sshPassphrase === "") {
    sshPassphrase = vRAVmProperties.get('Puppet.SSH.Passphrase');
  }
  useSudo = vRAVmProperties.get('Puppet.SSH.UseSudo.Override');
  if (useSudo === null || useSudo === "") {
    useSudo = vRAVmProperties.get('Puppet.SSH.UseSudo');
  }
  winRMUsername = vRAVmProperties.get('Puppet.WinRM.Username.Override');
  if (winRMUsername === null || winRMUsername === "") {
    winRMUsername = vRAVmProperties.get('Puppet.WinRM.Username');
  }
  winRMPassword = vRAVmProperties.get('Puppet.WinRM.Password.Override');
  if (winRMPassword === null || winRMPassword === "") {
    winRMPassword = vRAVmProperties.get('Puppet.WinRM.Password');
  }
  puppetAgentAccountUser = vRAVmProperties.get('Puppet.Windows.AgentAccountUser.Override');
  if (puppetAgentAccountUser === null || puppetAgentAccountUser === "") {
    puppetAgentAccountUser = vRAVmProperties.get('Puppet.Windows.AgentAccountUser');
  }
  puppetAgentAccountPassword = vRAVmProperties.get('Puppet.Windows.AgentAccountPassword.Override');
  if (puppetAgentAccountPassword === null || puppetAgentAccountPassword === "") {
    puppetAgentAccountPassword = vRAVmProperties.get('Puppet.Windows.AgentAccountPassword');
  }
  puppetAgentAccountDomain = vRAVmProperties.get('Puppet.Windows.AgentAccountDomain.Override');
  if (puppetAgentAccountDomain === null || puppetAgentAccountDomain === "") {
    puppetAgentAccountDomain = vRAVmProperties.get('Puppet.Windows.AgentAccountDomain');
  }
  if (sshUsername && winRMUsername) {
      throw "Both SSH and WinRM credentials supplied. Please provide only SSH creds for Linux and only WinRM creds for Windows.";
  }
  if (sshUsername) { isWindows = false; }
  if (winRMUsername) { isWindows = true; }
  var getUseHTTPS = vRAVmProperties.get('Puppet.WinRM.UseHTTPS');
  var isTrueSetHTTPS = (getUseHTTPS == 'true' || getUseHTTPS == true);
  var isFalseSetHTTPS = (getUseHTTPS == 'false' || getUseHTTPS == false);
  if (isTrueSetHTTPS) {
    useHTTPS = true;
  }
  else if (isFalseSetHTTPS) {
    useHTTPS = false;
  }
  var getAuthMethod = vRAVmProperties.get('Puppet.WinRM.AuthMethod');
  var isBasicAuth = (getAuthMethod == 'basic' || getAuthMethod == 'Basic');
  var isKrbAuth = (getAuthMethod == 'kerberos' || getAuthMethod == 'Kerberos');
  if (isBasicAuth) {
    winRMAuthMethod = 'Basic';
  }
  else if (isKrbAuth) {
    winRMAuthMethod = 'Kerberos';
  }
  keepFailedVMs = vRAVmProperties.get('Puppet.Debug.KeepFailedVMs');
  // certname may be passed, but if not, Puppet will generate this based on fqdn of vm.
  puppetNodeCertname = vRAVmProperties.get('Puppet.Node.Certname');
  puppetMasterInstallUUID = vRAVmProperties.get('Puppet.Master.InstallUUID');
  if (puppetMasterInstallUUID === null || puppetMasterInstallUUID === "") {
    puppetMasterInstallUUID = vRAVmProperties.get('Puppet.Master.UUID');
  }
  // [String] Optional FQDN or IP of the load balancer or compile master to install agent from.
  puppetInstallMaster = vRAVmProperties.get('Puppet.Master.InstallMaster');
  // [String] Optional IP Address for the host to install Puppet Agent on, used to specify host if DNS isn't set up at time of install.
  puppetNode = vRAVmProperties.get('Puppet.Node.IPAddress');
  if (puppetNode === null || puppetNode === "") {
    puppetNode = name;
  }
  // [Boolean] Optional Param that Ignores changes in the Puppet Run. If True, Puppet Runs that exits with changes (exit code 2) will still pass. Defaults to false.
  ignoreChanges = vRAVmProperties.get('Puppet.Node.IgnoreChanges');
}
catch (e) {
  errorCode += "\n" + "Error in Get Properties: " + e + ".";
}
