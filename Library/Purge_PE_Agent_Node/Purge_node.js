/**
 * Purge node
 *
 * @param {Puppet:Master} puppetMaster
 * @param {string} puppetNodeCertname
 * @param {string} errorCode
 * @return {string} errorCode
 */
var useSudo = puppetMaster.getUseSudo();

System.log("Purging certname: " + puppetNodeCertname);

var purgeResult = puppetMaster.executeCommand((useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet node purge " + PuppetWorkflowUtils.bashEscaper.escape(puppetNodeCertname));

System.debug(purgeResult);

if (purgeResult.exitCode !== 0) {
    var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", purgeResult.output);
    if (!error) {
        error = "Failed purge cert from master. exitCode=" + purgeResult.exitCode;
    }
    errorCode = error;
    System.error(errorCode);
    throw errorCode;
}
