/**
 * @description Validates and checks the metadata tags on all external networks in a vCloud Director
 *              organization. For each external network, it verifies that required hidden (PRIVATE)
 *              metadata tags exist. Sends email alerts for missing or incorrectly configured tags.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string} NOREPLY_EMAIL - The sender email address for alert notifications.
 * @param {string} DEVOPS_EMAIL - The recipient email address for alert notifications.
 * @param {ResourceElement} METADATA_ERROR_MAIL - Resource Element containing the HTML email template.
 * @returns {void}
 */

System.log("Fetching External Network Metadata");
var vcdHostObj = System.getModule("org.telus.vCloud").getvCloudHost();
var allExtNetworks = vcdHostObj.toAdminObject().getExternalNetworks();

var index;
for (index = 0; index < allExtNetworks.length; index++) {
    var extNetwork = allExtNetworks[index];
    var metaData = extNetwork.getMetadata();
    var entriesList = metaData.getTypedEntries().enumerate();
    System.log(extNetwork.name + " external network has metadata tags.");

    var validTagsCount = 0;
    var hasErrorReported = false;
    var netType = "";

    var i;
    for (i = 0; i < entriesList.length; i++) {
        var metadataEntry = entriesList[i];
        
        // Check Network Type
        if (metadataEntry.key == "externalNetworkType") {
            try {
                netType = metadataEntry.typedValue.getValue(new VclMetadataStringValue).value;
                if (metadataEntry.domain.visibility != "PRIVATE") throw "Metadata Tag is not hidden.";
                System.log("Key: " + metadataEntry.key + ", Value: " + netType);
                validTagsCount++;
            } catch (e) {
                hasErrorReported = true;
                sendErrorEmail(NOREPLY_EMAIL, DEVOPS_EMAIL, extNetwork.name, metadataEntry.key, METADATA_ERROR_MAIL);
                System.warn("Metadata error for " + extNetwork.name + ": " + e);
            }
        }

        // Check Network Function
        if (metadataEntry.key == "externalNetworkFunction") {
            try {
                var funcValue = metadataEntry.typedValue.getValue(new VclMetadataStringValue).value;
                if (metadataEntry.domain.visibility != "PRIVATE") throw "Metadata Tag is not hidden.";
                System.log("Key: " + metadataEntry.key + ", Value: " + funcValue);
                validTagsCount++;
            } catch (e) {
                hasErrorReported = true;
                sendErrorEmail(NOREPLY_EMAIL, DEVOPS_EMAIL, extNetwork.name, metadataEntry.key, METADATA_ERROR_MAIL);
                System.warn("Metadata error for " + extNetwork.name + ": " + e);
            }
        }

        // Check Network Owner for private networks
        if (netType == "private" && metadataEntry.key == "externalNetworkOwner") {
            try {
                var ownerValue = metadataEntry.typedValue.getValue(new VclMetadataStringValue).value;
                if (metadataEntry.domain.visibility != "PRIVATE") throw "Metadata Tag is not hidden.";
                System.log("Key: " + metadataEntry.key + ", Value: " + ownerValue);
                validTagsCount++;
            } catch (e) {
                hasErrorReported = true;
                sendErrorEmail(NOREPLY_EMAIL, DEVOPS_EMAIL, extNetwork.name, metadataEntry.key, METADATA_ERROR_MAIL);
                System.warn("Metadata error for " + extNetwork.name + ": " + e);
            }
        }
    }

    if (!hasErrorReported) {
        var expectedCount = (netType == "private") ? 3 : 2;
        if (validTagsCount === expectedCount) {
            System.log("All essential tags found correctly for " + extNetwork.name);
        } else {
            sendGeneralErrorEmail(NOREPLY_EMAIL, DEVOPS_EMAIL, extNetwork.name, "Essential Metadata tags not found.");
        }
    }
}

System.log("//End of script");
return null;

/**
 * Sends a specific metadata error email.
 */
function sendErrorEmail(from, to, netName, key, template) {
    var mail = new EmailMessage();
    mail.fromAddress = from;
    mail.toAddress = to;
    mail.subject = "Metadata Tag fault in " + netName;
    var content = System.getModule("org.telus.xavient.util").replaceContentofResourceElement(template, [netName, key]);
    mail.addMimePart(content, "text/html; charset=UTF-8");
    mail.sendMessage();
}

/**
 * Sends a general missing metadata error email.
 */
function sendGeneralErrorEmail(from, to, netName, msg) {
    var mail = new EmailMessage();
    mail.fromAddress = from;
    mail.toAddress = to;
    mail.subject = "Metadata fault in external network " + netName;
    mail.addMimePart(msg, "text/html; charset=UTF-8");
    mail.sendMessage();
}
