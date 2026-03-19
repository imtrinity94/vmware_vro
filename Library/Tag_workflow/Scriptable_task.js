/**
 * Scriptable task
 *
 * @param {Workflow} taggedObject
 * @param {boolean} isGlobal
 * @param {string} tagName
 * @param {string} tagValue
 */
if ( isGlobal ) {
  Server.tagGlobally(taggedObject, tagName, tagValue );
} else {
  Server.tag(taggedObject, tagName, tagValue );
}
System.log("Tag created : " + tagName + " = " + tagValue);
