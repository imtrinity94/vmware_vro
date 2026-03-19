/**
 * Send Email
 *
 * @param {string} smtpHost
 * @param {number} smtpPort
 * @param {string} username
 * @param {SecureString} password
 * @param {string} fromName
 * @param {string} fromAddress
 * @param {string} toAddress
 * @param {string} subject
 * @param {string} content
 * @param {boolean} useStartTls - [object Object]
 */
var message = new EmailMessage("TLSv1.2");

// Override default settings if and only if input parameter is set
if ( smtpHost != null && smtpHost.length > 0 ){
	message.smtpHost = smtpHost;
}
if ( smtpPort != null && smtpPort > 0 ){
	message.smtpPort = smtpPort;
}
if ( username !=null && username.length > 0){
	message.username = username;
}
if ( password != null && password.length > 0){
	message.password = password;
}
if ( fromName != null && fromName.length > 0){
	message.fromName = fromName;
}
if ( fromAddress != null && fromAddress.length > 0){
	message.fromAddress = fromAddress;
}

if ( useStartTls ){
	message.useStartTls = true;
}

message.toAddress = toAddress;
message.subject = subject;
message.addMimePart(content,"text/html; charset=UTF-8");

System.log( "sending mail to host: " + message.smtpHost + ":" + message.smtpPort + " with user:" + message.username 
			+ ", from:" + message.fromAddress + ", to:" + message.toAddress );

message.sendMessage();