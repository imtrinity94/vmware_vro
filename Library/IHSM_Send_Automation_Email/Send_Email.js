/**
 * Send Email
 *
 * @param {string} smtpHost
 * @param {string} username
 * @param {string} fromAddress
 * @param {string} toAddress
 * @param {string} subject
 * @param {string} content
 * @param {AD:User} adUser
 * @param {string} fromName
 */
var message = new EmailMessage();
var site = System.getModule("com.ihsm.custom").ihsm_getvcoSiteName();
fromAddress = site + "-iaas-admin@info.corp";
fromName = site + "-iaas-admin";
smtpHost = System.getModule("com.ihsm.custom").ihsm_getvcoSMTPRelay();
//System.log (toAddress)
// Override default settings if and only if input parameter is set
if ( smtpHost != null && smtpHost.length > 0 ){
	message.smtpHost = smtpHost;
}


if ( fromAddress != null && fromAddress.length > 0){
	message.fromAddress = fromAddress;
}
if ( fromName != null && fromName.length > 0){
	message.fromName = fromName;
}

message.toAddress = toAddress;
message.subject = subject;
message.addMimePart(content,"text/html; charset=UTF-8");

System.log( "sending mail to host: " + message.smtpHost + ":" + message.smtpPort + " with user:" + message.username 
			+ ", from:" + message.fromAddress + ", to:" + message.toAddress );

message.sendMessage();