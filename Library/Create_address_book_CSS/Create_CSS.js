/**
 * Create CSS
 *
 * @param {Path} directory
 */
var writer = new FileWriter(directory+"/"+"DunesAddressBook.css") ;
writer.open() ;
writer.clean() ;
writer.writeLine("address-book") ;
writer.writeLine("{") ;
writer.writeLine("background-color: #ffffff;") ;
writer.writeLine("width: 100%;");
writer.writeLine("}") ;

writer.writeLine("name") ;
writer.writeLine("{") ;
writer.writeLine("display: block;") ;
writer.writeLine("margin-top: 20pt ;") ;
writer.writeLine("border-bottom-style: solid ;") ;
writer.writeLine("border-width: 1px ;") ;
writer.writeLine("border-bottom-color:#000000 ;") ;
writer.writeLine("font-size: 20pt;") ;
writer.writeLine("margin-bottom: 10pt;") ;
writer.writeLine("margin-left: 0;") ;
writer.writeLine("}") ;
writer.writeLine("") ;

writer.writeLine("address") ;
writer.writeLine("{") ;
writer.writeLine("color: #0000FF;") ;
writer.writeLine("font-size: 14pt;") ;
writer.writeLine("}") ;
writer.writeLine("") ;

writer.writeLine("company") ;
writer.writeLine("{") ;
writer.writeLine("display : none ;") ;
writer.writeLine("color: #0000FF;") ;
writer.writeLine("font-size: 14pt;") ;
writer.writeLine("}") ;
writer.writeLine("") ;

writer.writeLine("email,phone") ;
writer.writeLine("{") ;
writer.writeLine("Display: block;") ;
writer.writeLine("color: #000000;") ;
writer.writeLine("margin-left: 20pt;") ;
writer.writeLine("}") ;
writer.writeLine("") ;
writer.close() ;

