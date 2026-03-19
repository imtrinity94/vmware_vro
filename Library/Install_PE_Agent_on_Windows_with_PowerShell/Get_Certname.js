/**
 * Get Certname
 *
 * @param {string} nodeHostname
 * @param {PowerShell:PowerShellHost} host
 * @param {boolean} removeCSRFiles
 * @return {string} nodeCertname
 */
if (removeCSRFiles) {
    var csrAttributesYamlFile = "$env:ProgramData\\PuppetLabs\\puppet\\etc\\csr_attributes.yaml";
    var csrPemFile = "$env:ProgramData\\PuppetLabs\\puppet\\etc\\ssl\\certificate_requests\\*";

    var session;
    var error;
    var exitCode;

    try {
    session = host.openSession();

    var result = session.invokeScript("cmd /c \"puppet config print certname\"");

    if (result.hasErrors()) {
      	System.log("There was an error attempting to retrieve certname for: " + nodeHostname);
      	result.getErrors().forEach(System.log);
    } else {
    	nodeCertname = result.getHostOutput();
	}
  }
  catch(e) {
    System.error("Error retrieving certname on " + nodeHostname + ": " + e);
  }
  finally {
    if (session) {
      try {
        host.closeSession(session.getSessionId());
	  }
	  catch(e) {
        System.error("Error closing host session: " + e);
      }
    }
	System.log("Certname is: " + nodeCertname);
  }
}