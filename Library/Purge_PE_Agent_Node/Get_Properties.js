/**
 * Get Properties
 *
 * @param {Properties} payload
 * @param {string} errorCode
 * @return {string} uuid
 * @return {string} puppetMasterPurgeUUID
 * @return {string} errorCode
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
    var array = new Array();
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

  uuid = properties["ID"]; //using the vRA machine.id which is actually the IaaS UUID.
  var name = machine.get("name");
  System.log("Purge Puppet Agent Node: Name of VM is " + name + ", and the UUID is " + uuid);

  puppetMasterPurgeUUID = vRAVmProperties.get('Puppet.Master.PurgeUUID');
  if (puppetMasterPurgeUUID === null || puppetMasterPurgeUUID === "") {
    puppetMasterPurgeUUID = vRAVmProperties.get('Puppet.Master.UUID');
  }
}
catch (e) {
  errorCode += "\n" + "Error in Get Properties: " + e + ".";
}