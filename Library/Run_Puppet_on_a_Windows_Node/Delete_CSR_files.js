/**
 * Delete CSR files
 *
 * @param {string} nodeHostname
 * @param {PowerShell:PowerShellHost} host
 * @param {boolean} removeCSRFiles
 */
if (removeCSRFiles) {
    var csrAttributesYamlFile = "$env:ProgramData\\PuppetLabs\\puppet\\etc\\csr_attributes.yaml";
    var csrPemFile = "$env:ProgramData\\PuppetLabs\\puppet\\etc\\ssl\\certificate_requests\\*";

    var session;
    var error;
    var exitCode;

    try {
    session = host.openSession();

    // delete csr_attributes.yaml and CSR pem
    System.debug("Removing " + csrAttributesYamlFile + " and " + csrPemFile);
    var removeCsrAttributes = session.invokeScript("Remove-Item \"" + csrAttributesYamlFile + "\"");
    var removeCsrPem = session.invokeScript("Remove-Item \"" + csrPemFile + "\"");

    if (removeCsrAttributes.hasErrors() || removeCsrPem.hasErrors()) {
      System.log("There was an error attempting to remove " + csrAttributesYamlFile + " or " + csrPemFile);
      removeCsrAttributes.getErrors().forEach(System.log);
      removeCsrPem.getErrors().forEach(System.log);
    }
  }
  catch(e) {
    System.error("Error deleting CSR files on " + nodeHostname + ": " + e);
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
  }
}