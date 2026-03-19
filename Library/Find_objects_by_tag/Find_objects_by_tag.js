/**
 * Find objects by tag
 *
 * @param {boolean} advanced
 * @param {string} advancedQuery
 * @param {string} tagName1
 * @param {string} tagValue1
 * @param {boolean} tagIsGlobal1
 * @param {string} tagName2
 * @param {string} tagValue2
 * @param {boolean} tagIsGlobal2
 * @param {string} tagName3
 * @param {string} tagValue3
 * @param {boolean} tagIsGlobal3
 * @param {string} tagName4
 * @param {string} tagValue4
 * @param {boolean} tagIsGlobal4
 * @return {Array/Any} objects
 */
var tagQuery = new TagQuery();

function addTagFilter(tag, value, isGlobal ){
  if (tag != null && tag.length > 0) {
     if  (isGlobal) {
       tagQuery.hasGlobalTag(tag,value);
     } else {
       tagQuery.hasTag(tag,value);
     }     
  }
}

var  found;
if (advanced) {	  
	found = Server.queryByTags(eval(advancedQuery), null);
} else {
	addTagFilter(tagName1, tagValue1, tagIsGlobal1)
	addTagFilter(tagName2, tagValue2, tagIsGlobal2)
	addTagFilter(tagName3, tagValue3, tagIsGlobal3)
	addTagFilter(tagName4, tagValue4, tagIsGlobal4)
	System.log("Query :" + tagQuery);
	found = Server.queryByTags(tagQuery, null);
}

System.log ( 'Objects found :' + found.length );
objects  = new Array();
for ( var idx in found) {
	System.log(found[idx])
	objects[idx] = found[idx]
}
