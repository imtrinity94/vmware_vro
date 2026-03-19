/**
 * Prepare parameters
 *
 * @param {VC:HostSystem} esxHost
 * @return {AutoDeploy:AutoDeployItem} esxHostItem
 */
esxHostItem = new AutoDeployItem(esxHost._getRef().type, esxHost._getRef().value);