/**
 * Simple task with custom script capability.
 *
 * @param {boolean} forceDelete
 * @param {VRA:Network} network
 * @return {VRA:RequestTracker} requestTracker
 */
var networkService = network.host.createInfrastructureClient().createNetworkService();
requestTracker = networkService.deleteNetwork(network.id, forceDelete);
System.log("Delete network request has been successfully placed with request tracking id " + requestTracker.id);
