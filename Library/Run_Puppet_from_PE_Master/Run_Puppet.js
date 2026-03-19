/**
 * Run Puppet
 *
 * @param {Puppet:Master} puppetMaster
 * @param {string} puppetNodeCertname
 * @param {string} errorCode
 * @param {number} puppetRunCount
 * @param {boolean} ignoreChanges
 * @return {boolean} puppetRunSuccess
 * @return {number} puppetRunCount
 */
System.log("Running Puppet on: " + puppetNodeCertname);

var runResult = puppetMaster.executeCommand("/opt/puppetlabs/bin/puppet-job run --format json --description \"Run Puppet from vRO\" --nodes " + puppetNodeCertname);

if (runResult.exitCode !== 0) {
   var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", runResult.output);
    if (!error) {
        error = "Failed to Run Puppet from master. exitCode=" + runResult.exitCode;
    }
    errorCode += "\n" + error;
   	System.error(errorCode);
    puppetRunSuccess = false;
}

try {
	var resultsHash = JSON.parse(runResult.output);
}
catch(error) {
	errorCode += "\nError parsing results: " + error;
	System.error(errorCode);
	puppetRunSuccess = false;
}

if (resultsHash['items']) {
    nodeResults = resultsHash['items'][0];
    System.log("Puppet run state: " + resultsHash['state']);

    if (resultsHash['state'] != 'finished') {
        errorCode += "\nPuppet run exited with: " + nodeResults['detail'];
        System.error(errorCode);
        puppetRunSuccess = false;
    }
    else {
        System.log("Puppet Run results from: " + nodeResults['name']);
        System.log("Failed: " + nodeResults['metrics']['failed']);
        System.log("Changed: " + nodeResults['metrics']['changed']);
        System.log("Skipped: " + nodeResults['metrics']['skipped']);
        System.log("Unchanged: " + nodeResults['metrics']['unchanged']);
        System.log("No-op: " + nodeResults['metrics']['noop']);
	
        if (ignoreChanges && nodeResults['metrics']['failed'] === 0) {
            puppetRunSuccess = true;
        }
        else if (nodeResults['metrics']['failed'] !== 0 || nodeResults['metrics']['changed'] !== 0 || nodeResults['metrics']['skipped'] !== 0) {
            puppetRunSuccess = false;
        }
        else {
            puppetRunSuccess = true;
        }
    }
}
else {
	errorCode += "\nUnable to fetch results from Puppet run.";
    System.error("Unable to fetch results from Puppet run.");
    puppetRunSuccess = false;
}
