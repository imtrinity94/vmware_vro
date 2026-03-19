/**
 * Prepare parameters
 *
 * @param {VC:HostSystem} esxHost
 * @return {AutoDeploy:AutoDeployItem} targetEsxHost
 */
targetEsxHost = new AutoDeployItem(esxHost._getRef().type, esxHost._getRef().value);
