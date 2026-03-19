/**
 * Prepare parameters
 *
 * @param {Array/VC:HostSystem} esxHosts
 * @return {Array/AutoDeploy:AutoDeployItem} esxHostItems
 */
esxHostItems = new Array();
if (esxHosts.length > 0) {
    for(var i = 0; i < esxHosts.length; i++) {
        var esxHostItem = new AutoDeployItem(esxHosts[i]._getRef().type, esxHosts[i]._getRef().value);
        esxHostItems.push(esxHostItem);
    }
}

