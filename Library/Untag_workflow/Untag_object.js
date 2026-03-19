/**
 * Untag object
 *
 * @param {Workflow} taggedObject
 * @param {boolean} isGlobal
 * @param {string} tagName
 */
try { 
    var	tags = new Array(tagName);
	if ( isGlobal ) {
	  Server.untagGlobally(taggedObject,  tags);
	} else {
	  Server.untag(taggedObject, tags);
	}
} catch (e) {
  System.error(e);
}

