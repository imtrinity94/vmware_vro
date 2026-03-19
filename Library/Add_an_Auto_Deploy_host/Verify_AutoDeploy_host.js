/**
 * Verify AutoDeploy host
 *
 * @param {AutoDeploy:AutoDeploy} adHost
 * @param {string} adHostUri
 * @return {AutoDeploy:AutoDeploy} adHost
 */
if (adHost.adUri != adHostUri) {
    System.log("AutoDeploy URI has been changed in the meantime! expected: " + adHostUri + " actual: " + adHost.adUri);
    System.getModule("com.vmware.library.autodeploy.configuration").removeAutoDeployHost(adHost) ;
    throw "AutoDeploy URI has been changed in the meantime!";
}
