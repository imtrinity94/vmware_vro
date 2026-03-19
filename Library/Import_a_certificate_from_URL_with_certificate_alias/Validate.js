/**
 * Validate
 *
 * @param {string} cer
 * @return {string} error
 * @return {boolean} isNotTrusted
 * @return {boolean} isCertificateExpired
 * @return {boolean} isDomainWrong
 * @return {string} certInfo
 * @return {string} certificateHostName
 * @return {boolean} isNotValid
 * @return {string} errorText
 */
var ld = Config.getKeystores().getImportCAFromUrlAction();
var model = ld.getModel();
model.value = cer;
if(!error){
	try{
		var certValidationResult = ld.validateCertificates();
		certInfo = ld.getCertInfo();
		isNotTrusted = certValidationResult.isNoChainOfTrust();
		isCertificateExpired = certValidationResult.isCertificateExpired();
		isDomainWrong = certValidationResult.isWrongDomain();
		certificateHostName = certValidationResult.getCertificateHostName();
		isNotValid = certValidationResult.isNotValid();
		errorText = certValidationResult.getErrorText();
		if (isNotValid) {
            System.warn("One or more certificates in the chain are not valid.\n" +
             "Error: " + errorText + "\n" + 
             "Certificate chain details: \n" + ld.getCertificateChainInfo());
        }
	}catch(e){
        System.warn("One or more certificates in the chain are not valid.\n" + 
             "Certificate chain details: \n" + ld.getCertificateChainInfo());
		error = e.toString();
	}
}