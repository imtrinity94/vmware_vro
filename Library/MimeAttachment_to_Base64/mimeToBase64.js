/**
 * Extracts data from a MimeAttachment object as Base64 encoded string.
 *
 * @param {MimeAttachment} mime
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.encoding").mimeToBase64(mime) ;