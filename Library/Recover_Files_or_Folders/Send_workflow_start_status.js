/**
 * Send workflow start status
 *
 * @param {string} subject
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
 */
if (sendMailNotification) {
    try {
        var errorMessage = CSProtectionSourceManager.sendMailNotification(
            "Started",
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
            null
        );
        if (errorMessage != null && errorMessage.message != null) {
            System.error(errorMessage.message);
        } else {
            System.log("Job start mail sent successfully.");
        }
    } catch (err) {
        // Do not throw an exception here.
        System.error("Failed to send an email. Error: " + err);
    }
}