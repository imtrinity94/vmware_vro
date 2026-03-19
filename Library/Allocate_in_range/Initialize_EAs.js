/**
 * Initialize EAs
 *
 * @param {string} resourceId
 * @param {number} vnicIndex
 * @param {string} startAddress
 * @param {Properties} attrEaProperties
 * @return {Properties} attrEaProperties
 */
//if (attrEaProperties == null || attrEaProperties ==undefined){
attrEaProperties = new Properties();
attrEaProperties.put("VMware resource ID", resourceId);
attrEaProperties.put("VMware NIC index", vnicIndex.toString());
System.log("Ea " + attrEaProperties);
for (var key in attrEaProperties) {
  if (attrEaProperties.hasOwnProperty(key)) {
    var value = attrEaProperties[key];
    System.log(key + ': ' + value);
  }
}