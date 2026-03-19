/**
 * Prepare parameters
 *
 * @param {VC:HostSystem} host
 * @return {AutoDeploy:AutoDeployItem} targetHost
 */
targetHost = new AutoDeployItem(host._getRef().type, host._getRef().value);