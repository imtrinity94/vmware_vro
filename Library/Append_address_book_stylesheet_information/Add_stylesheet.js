/**
 * Add stylesheet
 *
 * @param {Path} directory
 */
var filePath = directory+"/"+"MyDunesAddressBook.xml" ;
var filePath2 = directory+"/"+"MyDunesAddressBook-CSS.xml" ;

var document = XMLManager.loadDocument(filePath,false) ;

var root = document.getDocumentElement() ;
var datas = "type=\"text/css\" href=\"DunesAddressBook.css\"" ;
var processing = document.createProcessingInstruction("xml-stylesheet",datas) ;
document.insertBefore(processing,root) ;

System.log("Saving : "+filePath2) ;

XMLManager.saveDocument(document,filePath2) ;
