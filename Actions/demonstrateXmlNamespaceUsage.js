/**
 * @description Demonstrates the use of namespaces with the vRO E4X XML parser.
 *              Explains how to declare default and manual namespaces to ensure 
 *              correct element retrieval in namespaced XML documents.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// XML Namespaces
/* 
Declaring namespace is really important, because most of the XML files contain a default namespace, without this 
namespace declared in the code, E4X parser does not return any results. If there is only one namespace declared on the 
root node, the following code can be used before any XML operations. 

Usage Example:
default xml namespace = xmlObj.namespace();
*/

// Otherwise a namespace can also be declared manually:
var ovfNamespace = new Namespace("http://schemas.dmtf.org/ovf/envelope/1");
var vcloudNamespace = new Namespace("http://www.vmware.com/vcloud/v1.5");
var xsiNamespace = new Namespace("http://www.w3.org/2001/XMLSchema-instance");

System.log("Namespaces defined.");

return null;
