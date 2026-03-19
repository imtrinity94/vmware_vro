/**
 * Check Registeration
 *
 * @param {VC:SmsTask} result
 * @param {string} taskResult
 * @return {string} taskResult
 * @return {string} cert
 */
taskResult = null;

var response = result.querySmsTaskInfo();
if (response.progress != 100)
{
	System.log("Registration is not complete for provider. Waiting for a few seconds...");
	taskResult = "notDone";
}
else if (response.progress == 100)
{
	if (response.state != "success")
	{
		if (response.error instanceof VcAlreadyExists)
		{
			System.warn("The StoreServ VASA provider is already registered.");
			taskResult = "done";
		}
		else if (response.error instanceof CertificateNotTrusted) 
		{
			System.warn("Untrusted certificate. Retrying registeration with self-signed certificate" );
			taskResult = "selfSigned"
			cert = response.error.certificate;
		}
		else
		{
			throw (response.error);
		}
	}
	else if (response.state == "success")
	{
		System.log("The StoreServ VASA provider has been successfully registered.");
		taskResult = "done";
	}
}
	


