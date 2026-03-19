/**
 * Print first organization
 *
 * @param {REST:RESTHost} vlcoud_host
 * @param {string} org_list
 */

var doc = new XML(org_list);
default xml namespace = doc.namespace();
var names = doc..Org.@name;
for (var i in names) {
   System.log(names[i]);
}