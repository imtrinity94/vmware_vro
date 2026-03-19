/**
 * Find And Log
 *
 * @param {string} filePath
 */
var document = XMLManager.loadDocument(filePath,false) ;

var nodeList = document.getElementsByTagName("user") ;

for (var i = 0 ; i < nodeList.length ; i++) {
	var node = nodeList.item(i) ;
	if (node.getAttribute("ID") == "3") {
		var name = node.getAttribute("name") ;
		System.log("Found user with id 3 : '"+name+"'") ;
	}
}