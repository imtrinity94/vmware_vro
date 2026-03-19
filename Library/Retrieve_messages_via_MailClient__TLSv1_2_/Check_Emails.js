/**
 * Check Emails
 *
 * @param {string} mailServer
 * @param {number} mailPort
 * @param {string} mailUsername
 * @param {SecureString} mailPassword
 * @param {string} mailProtocol
 */
var myMailClient = new MailClient("TLSv1.2");

myMailClient.setProtocol(mailProtocol);
myMailClient.enableSSL();

myMailClient.connect( mailServer, mailPort, mailUsername, mailPassword);
System.log("Successfully login!");

try {
	myMailClient.openFolder("Inbox");
	
	var messages = myMailClient.getMessages();
	System.log("Reading messages...!");
	if ( messages != null && messages.length > 0 ) {
	  System.log( "You have " + messages.length + " email(s) in your inbox" );
	 for (i = 0; i < messages.length; i++) {
	  System.log("");
	  System.log("-----MSG-------");
	  System.log("Headers: ");
	  var headerProp = messages[i].getHeaders();
	  for each(key in headerProp.keys){
	   System.log(key+": "+headerProp.get(key));
	  }
	  System.log("");  
	
	  System.log( "Message["+ i +"] with from: " + messages[i].from + " to: " + messages[i].to);
	  System.log( "Message["+ i +"] with subject: " + messages[i].subject);
	  var content = messages[i].getContent();
	  System.log("Msg content as string: " + content);
	  if(messages[i].isContentMultiPart()){
   	   // get as multipart content
	   var multiPartContent = messages[i].getMultiPartContent();
	   System.log("==== Multipart msg detected ====");
	   for (p = 0; p < multiPartContent.getPartsCount(); p++){
	    System.log("== Body part " + p + " ==");
	    var bodyPart = multiPartContent.getBodyPart(p);
	    System.log("Content Type: " + bodyPart.contentType);
	    System.log("Disposition: " + bodyPart.disposition);
	    System.log("isAttachment: " + bodyPart.isAttachment());
	    System.log("fileName: " + bodyPart.fileName);
	    System.log("size: " + bodyPart.getSize());
	    System.log("content: " + bodyPart.getContent());
	    if(bodyPart.isAttachment()){
	     System.log("Getting as MimeAttachment:");
	     var attachment = bodyPart.getAsMimeAttachment();
		 // could be saved to a file
	     System.log("Mime Name: " + attachment.name);
	     System.log("Mime Type: " + attachment.mimeType);
	    }
	   }
	  }
	 }
	} else {
	  System.warn( "No messages found" );
	}
} finally {
	myMailClient.closeFolder();
	myMailClient.close();
}