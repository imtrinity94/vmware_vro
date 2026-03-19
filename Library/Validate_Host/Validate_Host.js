/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} host
 */
try{
    var ld = Config.getKeystores().getImportCAFromUrlAction();
    var model = ld.getModel();
    if(host.connectionType == "vra-onprem"){
        model.value = host.vraHost;
    }else{
        model.value = host.cloudHost;
    }
	var certValidationResult = ld.validateCertificates();
	var isCertificateExpired = certValidationResult.isCertificateExpired();
    if(!isCertificateExpired){
       if(VraHostManager.validate(host)){
            Server.log("Connection: " + host.name + " validated successfully.");            
        }
        else{
            Server.error("Connection: " + host.name + " is Invalid.");
            throw new Error("Connection validation Failed.");
        }
    }
    else{
        Server.error("Connection: " + host.name + " is Invalid, Certifcate is Expired.");
        throw new Error("Connection validation Failed due to expired Certificate.");
    }
}catch(e){
    Server.error("Connection: " + host.name + " is Invalid. Validation Workflow failed with exception: "+ e.toString());
    throw e;
}
