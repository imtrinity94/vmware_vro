/**
 * Set cloud EAs
 *
 * @param {Properties} attrEaProperties
 * @param {string} tenantId
 * @param {string} vmId
 * @param {string} vmName
 * @return {Properties} attrEaProperties
 */
// if ("Tenant ID" in attrEaProperties){
//     var tenantid = attrEaProperties["Tenant ID"]
//     attrEaProperties.put("Tenant ID", tenantid);
//     tenantId = tenantid}
// else{
attrEaProperties.put("Tenant ID", tenantId);
if (!("VMware resource ID" in attrEaProperties)){
    attrEaProperties.put("VMware resource ID", vmId);
    }
attrEaProperties.put("VM Name", vmName);
var componets = vmId.split("/");
attrEaProperties.put("VM ID" , componets[3]);
delete attrEaProperties['CMP Type']
delete attrEaProperties['Cloud API Owned']

for (var key in attrEaProperties) {
  if (attrEaProperties.hasOwnProperty(key)) {
    var value = attrEaProperties[key];
    System.log(key + ': ' + value);
  }
}