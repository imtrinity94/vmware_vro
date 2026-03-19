/**
 * Validate Protection Group and Datastore
 *
 * @param {PS:Volume} volume
 * @param {PS:ProtectionGroup} protectionGroup - [object Object]
 */
var result = PSProtectionGroupManager.getProtectionGroupsWithParam(volume.getSession() , "?source=true");
System.debug("Returned list of Protection Group objects of particular flashArray: " + result);
var check = false;
System.log("Checking if Protection Group and Volume corresponding to the Datastore belongs to the same FlashArray or not.");
for(var index = 0;index < result.length; index++) {
	if(result[index].name == protectionGroup.name) {
		check =true;
		break;
	}	
}
if(check == false) {
	var error = "Protection Group and Volume corresponding to the Datastore does not belongs to the same FlashArray.";
	System.error(error);
	throw error;
}
System.log("Protection Group and Volume corresponding to the Datastore belongs to the same FlashArray.");