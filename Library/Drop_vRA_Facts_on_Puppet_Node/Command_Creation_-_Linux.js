/**
 * Command Creation - Linux
 *
 * @param {string} nodeHostname
 * @param {string} factsJSON
 * @param {boolean} useSudo
 * @return {string} errorCode
 * @return {string} command
 * @return {boolean} failed
 */
if (factsJSON) {
    System.log("Creating vRA Puppet facts for " + nodeHostname);

    try {
    	JSON.parse(factsJSON);
    }
    catch(err) {
    	errorCode += 'factsJSON must be valid JSON string. ' + err + '.';
        throw errorCode;
    }
    var oneLineFacts = System.getModule("com.puppet.o11n.plugin.puppet").escapeJSON(factsJSON.replace(/[\n\r]/g, ''));
    System.debug(oneLineFacts);

    var command = (useSudo ? "sudo " : "") + "mkdir -p /etc/puppetlabs/facter/facts.d; "
                                           + "echo " + oneLineFacts + " | " +
                  (useSudo ? "sudo " : "") + "tee /etc/puppetlabs/facter/facts.d/puppet_vra_facts.json";

}