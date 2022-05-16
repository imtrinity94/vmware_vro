/**
 * Returns content of a resource element. Provided resource element will be search and replaced for variables like {{foo}}. Values to be replaced needs to be delivered as key/value in properties. Key is exactly the name of the variable. Value holds the string to be inserted.
 * @param {String} resourcePath //Path to resource element category
 * @param {String} reosurceName //Resource element name
 * @param {Properties} properties //Key/Value Store: key needs to be exactly like the placeholder/variable from the resource element. Value holds the string be inserted.
 * @return {String}
 */
var content = undefined;

//Fetch resource element
var category = Server.getResourceElementCategoryWithPath(resourcePath);
for each (var resourceElement in category.resourceElements) {
    if (resourceElement.name == resourceName) {
        content = resourceElement.getContentAsMimeAttachment().content;
        break;
    }
}
if(!content) throw "No resoucre element found for path: "+resourcePath+", and name: "+resourceName;

//gathering variables e.g. {{foo}}
var pattern = new RegExp(/\{\{[a-zA-Z]*\}\}/g);
var matches = content.match(pattern);

//replace variables
for each (var match in matches){
    var key = match.substring(2,match.length-2);
    System.debug("replacing match: " + match + ", with value: "+properties[key]);
    content = content.replace(match,properties[key]);
}

System.debug("new refined content: \n" + content);
return content;
