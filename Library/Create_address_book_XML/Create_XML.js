/**
 * Create XML
 *
 * @param {Path} directory
 */
function appendNode(doc,node,elementName,elementValue,type) {
	var subnode = doc.createElement(elementName) ;
	node.appendChild(subnode) ;
	if (type != null) {
		subnode.setAttribute("type",type) ;
	}
	var txtNode = doc.createTextNode(elementValue) ;
	subnode.appendChild(txtNode) ;
}

function appendContact(doc,element,name,email,phone,fax,address) {
	var contact = doc.createElement("contact") ;
	element.appendChild(contact) ;
	appendNode(doc,contact,"name",name) ;
	appendNode(doc,contact,"company", System.getModule("com.vmware.constants").getDefaultCompanyName()) ;
	appendNode(doc,contact,"address",address) ;
	appendNode(doc,contact,"email",email) ;

	appendNode(doc,contact,"phone",phone,"work") ;
	appendNode(doc,contact,"phone",fax,"fax") ;
}

var document = XMLManager.newDocument() ;

// Create and set root element
var root = document.createElement("address-book") ;

document.appendChild(root) ;
root.appendChild(document.createComment("List of contacts")) ;

// create contacts
appendContact(document,root,"Corporate Headquarters","sales@dunes.ch","+41 21 697 60 62","+41 21 697 60 61","Port-Franc 2 1003 Lausanne Switzerland") ;
appendContact(document,root,"Channel Sales","channelsales@dunes.ch","+41 21 697 60 65","+41 21 697 60 61","Port-Franc 2 1003 Lausanne Switzerland") ;
appendContact(document,root,"Press and Analyst Relations","info@dunes.ch","+41 21 697 60 65","+41 21 697 60 61","Port-Franc 2 1003 Lausanne Switzerland") ;

var filePath = directory+"/"+"MyDunesAddressBook.xml" ;
var dtdPath = directory+"/"+"DunesAddressBook.dtd"
XMLManager.saveDocument(document,filePath,dtdPath) ;
