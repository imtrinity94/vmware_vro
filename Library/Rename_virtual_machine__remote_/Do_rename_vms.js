/**
 * Do rename vms
 *
 * @param {VCO:RemoteServer} server
 * @param {VCO:RemotePluginObject} vm
 * @param {string} newName
 * @return {VCO:RemoteWorkflowToken} token
 */
// Id can be viewed in the scripting of the proxy workflows generated for a server
var workflowId = "BD808080808080808080808080808080F0C280800122528313869552e41805bb1";

var tokens = [];
var parameters = new Properties();
parameters.put("vm", vm.id);
parameters.put("newName", newName);
var result = VCOProxyWorkflowManager.executeSynchronousProxy(server.connectionId, workflowId, parameters);
token = result.get("remoteToken");
