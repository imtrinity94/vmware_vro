/**
 * Logging results
 *
 * @param {Properties} actionResult
 * @return {Properties} attributes
 */
attributes = actionResult;
System.log("ESXi host attributes: ");
System.log("=====");
for(var i in attributes.keys) {
    System.log("attribute: " + attributes.keys[i] + " value: " + attributes.get(attributes.keys[i]));
}
System.log("=====");