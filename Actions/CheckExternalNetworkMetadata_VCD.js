System.log("Fetching External Network Metadata");
var vcdHost = System.getModule("org.telus.vCloud").getvCloudHost();
var allExtNet = vcdHost.toAdminObject().getExternalNetworks();
for (index in allExtNet) {
	var exNet = allExtNet[index];
    var extNetMetadata = extNet.getMetadata();
    var entries = extNetMetadata.getTypedEntries();
    var enumeratedEntries = entries.enumerate();
    System.log(extNet.name + " external network has following metadata tag(s):");
    var count = 0;
    var mailFlag = false;
    for each(entry in enumeratedEntries) {
        try {
            if (entry.key == "externalNetworkType") {
                var networkTypeValue = entry.typedValue.getValue(new VclMetadataStringValue).value;
                var visibility = entry.domain.visibility; //null for Read/Write //READONLY for ReadOnly //PRIVATE for Hidden
                if (visibility != "PRIVATE") throw "Metadata Tag is not hidden.";
                //scope = entry.domain.value; // SYSTEM or (null for Read/Write )
                System.log("\nKey: " + entry.key + "\nValue: " + networkTypeValue + "\nVisbility: " + visibility);
                count++;
                continue;
            } //else throw "externalNetworkType Metadata must exist for a external network.";
        } catch (e) {
            mailFlag = true;
            var message = new EmailMessage();
            message.fromAddress = NOREPLY_EMAIL;
            message.toAddress = DEVOPS_EMAIL;
            message.subject = "Metadata Tag fault in " + extNet.name;
            message.addMimePart(System.getModule("org.telus.xavient.util").replaceContentofResourceElement(METADATA_ERROR_MAIL, [extNet.name, entry.key]), "text/html; charset=UTF-8");
            message.sendMessage();
            System.warn("externalNetworkType Metadata not correct for " + extNet.name + ". Error: " + e);
        }
        try {
            if (entry.key == "externalNetworkFunction") {
                var value = entry.typedValue.getValue(new VclMetadataStringValue).value;
                var visibility = entry.domain.visibility; //null for Read/Write //READONLY for ReadOnly //PRIVATE for Hidden
                if (visibility != "PRIVATE") throw "Metadata Tag is not hidden.";
                System.log("\nKey: " + entry.key + "\nValue: " + value + "\nVisbility: " + visibility);
                //scope = entry.domain.value; // SYSTEM or (null for GENERAL & Read/Write )
                count++;
                continue;
            } //else throw "externalNetworkFunction Metadata must exist for a external network";
        } catch (e) {
            mailFlag = true;
            var message = new EmailMessage();
            message.fromAddress = NOREPLY_EMAIL;
            message.toAddress = DEVOPS_EMAIL;
            message.subject = "Metadata Tag fault in " + extNet.name;
            message.addMimePart(System.getModule("org.telus.xavient.util").replaceContentofResourceElement(METADATA_ERROR_MAIL, [extNet.name, entry.key]), "text/html; charset=UTF-8");
            message.sendMessage();
            System.warn("externalNetworkFunction Metadata not correct for " + extNet.name + ". Error: " + e);
        }

        if (networkTypeValue == "private") {
            try {
                if (entry.key == "externalNetworkOwner") {
                    value = entry.typedValue.getValue(new VclMetadataStringValue).value;
                    visibility = entry.domain.visibility; //null for Read/Write //READONLY for ReadOnly //PRIVATE for Hidden
                    if (visibility != "PRIVATE") throw "Metadata Tag is not hidden.";
                    //scope = entry.domain.value; // SYSTEM or (null for GENERAL & Read/Write )
                    System.log("\nKey: " + entry.key + "\nValue: " + value + "\nVisbility: " + visibility);
                    count++;
                    break;
                } //else throw "externalNetworkOwner Metadata must exist for a private external network.";
            } catch (e) {
                mailFlag = true;
                var message = new EmailMessage();
                message.fromAddress = NOREPLY_EMAIL;
                message.toAddress = DEVOPS_EMAIL;
                message.subject = "Metadata fault in external network " + extNet.name;
                message.addMimePart(System.getModule("org.telus.xavient.util").replaceContentofResourceElement(METADATA_ERROR_MAIL, [extNet.name, entry.key]), "text/html; charset=UTF-8");
                message.sendMessage();
                System.warn("Metadata not correct for " + extNet.name + ". Error: " + e);
            }
        }
    }
    if (!mailFlag) {
        if (networkTypeValue == "private") {
            if (count == 3) System.log("Essential tags found properly.");
            else {
                var message = new EmailMessage();
                message.fromAddress = NOREPLY_EMAIL;
                message.toAddress = DEVOPS_EMAIL;
                message.subject = "Metadata fault in external network " + extNet.name;
                message.addMimePart("Essential Metadata tags not found.", "text/html; charset=UTF-8");
                message.sendMessage();
            }
        }
        else{
		if (count == 2) System.log("Essential tags found properly.");
        	else {
            var message = new EmailMessage();
            message.fromAddress = NOREPLY_EMAIL;
            message.toAddress = DEVOPS_EMAIL;
            message.subject = "Metadata fault in external network " + extNet.name;
            message.addMimePart("Essential Metadata tags not found.", "text/html; charset=UTF-8");
            message.sendMessage();
        	}
    	}
	}
}
System.log("//End of script");
