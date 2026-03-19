/**
 * Send Email to lists
 *
 * @param {string} smtpHost
 * @param {number} smtpPort
 * @param {string} username
 * @param {SecureString} password
 * @param {string} fromName
 * @param {string} fromAddress
 * @param {Array/string} toAddressList
 * @param {string} subject
 * @param {string} content
 * @param {Array/string} ccList
 * @param {Array/string} bccList
 * @param {boolean} useSsl - [object Object]
 * @param {boolean} useStartTls - [object Object]
 */
function convertToComaSeparatedList( arrayList ){
	// Build Coma Seperated list from an Array
	
	if ( arrayList == null || arrayList.length == 0) {
		return null
	}
	
	var outStr = "";
	for ( var i=0; i<arrayList.length; i++ ){
		outStr += arrayList[i] + ",";
	}
	if ( outStr.length > 0 ){
		outStr = outStr.substring( 0, ( outStr.length-1 ) );
	}
	return outStr;
}

var message = new EmailMessage();

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

if ( useSsl ){
	message.useSsl = true;
}

if ( useStartTls ){
	message.useStartTls = true;
}

// Build Address Lists
message.toAddress = convertToComaSeparatedList(toAddressList);
message.ccAddress = convertToComaSeparatedList(ccList);
message.bccAddress = convertToComaSeparatedList(bccList);

message.subject = subject;
message.addMimePart(content,"text/html; charset=UTF-8");

System.log( "sending mail to host: " + message.smtpHost + ":" + message.smtpPort + " with user:" + message.username 
			+ ", from:" + message.fromAddress + ", to:" + message.toAddress );
			
message.sendMessage();
