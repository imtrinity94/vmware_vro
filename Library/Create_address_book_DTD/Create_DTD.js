/**
 * Create DTD
 *
 * @param {Path} directory
 */
var path = directory+"/"+"DunesAddressBook.dtd" ;
System.log("Creating DtD file : "+path) ;
var writer = new FileWriter(path) ;
writer.open() ;
writer.clean() ;
writer.writeLine("<!ELEMENT address-book (contact)* >") ;
writer.writeLine("<!-- contact -->") ;
writer.writeLine("<!ELEMENT contact (name,company,address,email*,phone*) >") ;
writer.writeLine("<!-- sub-elements -->") ;
writer.writeLine("<!ELEMENT name (#PCDATA)>") ;
writer.writeLine("<!ELEMENT company (#PCDATA)>") ;
writer.writeLine("<!ELEMENT address (#PCDATA)>") ;
writer.writeLine("<!ELEMENT email (#PCDATA)>") ;
writer.writeLine("<!ELEMENT phone (#PCDATA)>") ;

writer.writeLine("<!ATTLIST email ") ;
writer.writeLine("\ttype CDATA #IMPLIED") ;
writer.writeLine(">") ;

writer.writeLine("<!ATTLIST phone ") ;
writer.writeLine("\ttype CDATA #IMPLIED") ;
writer.writeLine(">") ;



writer.close() ;

