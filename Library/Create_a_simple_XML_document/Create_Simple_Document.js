/**
 * Create Simple Document
 *
 * @param {string} filePath
 */
var document = XMLManager.newDocument() ;

// Create and set root element
var root = document.createElement("root-element") ;

document.appendChild(root) ;

var userList = document.createElement("users") ;
root.appendChild(userList) ;
userList.appendChild(document.createComment("List of well known users")) ;

for (var i = 0 ; i < 10 ; i++) {
	var userName = "User number "+i ;
	var userid = i ;
	var userNode = document.createElement("user") ;
	userNode.setAttribute("name",userName) ;
	userNode.setAttribute("ID",userid) ;
	userList.appendChild(userNode) ;
}

XMLManager.saveDocument(document,filePath) ;
