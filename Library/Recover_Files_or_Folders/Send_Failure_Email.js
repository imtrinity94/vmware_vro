/**
 * Send Failure Email
 *
 * @param {string} subject
 * @param {string} errorMessage
 * @param {string} jobStatus
 * @param {boolean} sendMailNotification
 * @param {string} folderonly
 * @param {string} snapshot
 * @param {string} filesorfoldersname
 * @param {string} recoverto
 * @param {string} userName
 * @param {string} vmname
 * @param {string} content
 * @param {CS:EmailConfiguration} mailConnection
 * @param {string} formattedRecipients
 * @param {string} errorCode
 */
// In case of any exception, send a task failure email.
if (sendMailNotification) {
    try {
        var errorMessage = CSProtectionSourceManager.sendMailNotification(
            "Failed",
            mailConnection,
            formattedRecipients,
            content,
            vmname,
            folderonly,
            snapshot,
            userName,
            filesorfoldersname,
            recoverto,
            subject,
            errorCode
        );
        if (errorMessage != null && errorMessage.message != null) {
			System.error("Failure to send mail");
            System.error(errorMessage.message);
        } else {
            System.log("Job failure mail sent successfully.");
        }
    } catch (err) {
        // Do not throw an exception here.
        System.error("Failed to send an email. Error: " + err);
    }
}
// Throw the exception.
throw "The restore failed with error : " + errorCode;