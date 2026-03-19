/**
 * Loggin results
 *
 * @param {Properties} deployOptionsAttribute
 * @return {Properties} deployOptions
 */
deployOptions = deployOptionsAttribute;
System.log("Auto Deploy host configuration options: ");
System.log("=====");
if (deployOptions != null) {
    for(var i in deployOptions.keys) {
        var key = deployOptions.keys[i];
        System.log("key: " + key + " value: " + deployOptions.get(key));
    }
}
System.log("=====");