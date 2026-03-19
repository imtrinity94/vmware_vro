/**
 * Check Emails
 *
 * @param {string} emailServer
 * @param {number} defaultPort
 * @param {string} loginName
 * @param {SecureString} password
 */
var myPOP3Client = new POP3Client();

myPOP3Client.connect( emailServer, defaultPort );
myPOP3Client.login( loginName, password );

var messages = myPOP3Client.listMessages();

if ( messages != null && messages.length > 0 ) {
	System.log( "You have " +  messages.length + " email(s) in your inbox" );
	for ( i=0; i < messages.length; i++) {
		System.log( "Message["+ i +"] with subject: " + messages[i].subject );
		// System.log( "Message["+ i +"] with body: " + messages[i].body );
		//messages[i].deleteFromServer();
	}
} else {
	System.warn( "No messages found" );
}

myPOP3Client.logout();
myPOP3Client.disconnect();