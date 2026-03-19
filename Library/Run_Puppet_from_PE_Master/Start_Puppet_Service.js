/**
 * Start Puppet Service
 *
 * @param {Puppet:Master} puppetMaster
 * @param {string} puppetNodeCertname
 * @param {string} errorCode
 * @param {boolean} puppetStartSuccess
 * @param {number} puppetRunCount
 * @return {string} errorCode
 * @return {boolean} puppetStartSuccess
 */
System.log("Starting Puppet on: " + puppetNodeCertname);

var taskResult = puppetMaster.executeCommand("/opt/puppetlabs/bin/puppet-task run service name=puppet action=start --format json --description \"Puppet Service start from vRO\" --nodes " + puppetNodeCertname);

if (taskResult.exitCode !== 0) {
   var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", taskResult.output);
    if (!error) {
        error = "Failed to Start Puppet from master. exitCode=" + taskResult.exitCode;
    }
    errorCode += "\n" + error;
   	System.error(errorCode);
    puppetStartSuccess = false;
}

try {
	var resultsHash = JSON.parse(taskResult.output);
}
catch(error) {
	errorCode += "\nError parsing results: " + error;
	System.error(errorCode);
	puppetStartSuccess = false;
}

if (resultsHash['items']) {
    nodeResults = resultsHash['items'][0];
    System.log("Puppet start state: " + resultsHash['state']);

    if (resultsHash['state'] != 'finished') {
        errorCode += "\nPuppet start exited with: " + nodeResults['detail'];
        System.error(errorCode);
        puppetStartSuccess = false;
    }
    else {
        System.log("Puppet Start results from: " + nodeResults['name']);
        System.log("Status: " + nodeResults['results']['status']);
	
        puppetStartSuccess = true;

        //Reset Puppet Run count
        puppetRunCount = 0;
    }
}
else {
	errorCode += "\nUnable to fetch results from Puppet run.";
    System.error("Unable to fetch results from Puppet run.");
    puppetStartSuccess = false;
}
