/**
 * Find And Modify
 *
 * @param {string} filePath
 * @param {string} newFilePath
 */
var document = XMLManager.loadDocument(filePath,false) ;

var nodeList = document.getElementsByTagName("user") ;

for (var i = 0 ; i < nodeList.length ; i++) {
	var node = nodeList.item(i) ;
	if (node.getAttribute("ID") == "3") {
		var name = node.getAttribute("name") ;
		System.log("Found user with id 3 : '"+name+"', modifying it") ;
		node.appendChild(document.createComment("Found")) ;
		node.setAttribute("modified",true) ;
	}
}

XMLManager.saveDocument(document,newFilePath) ;
