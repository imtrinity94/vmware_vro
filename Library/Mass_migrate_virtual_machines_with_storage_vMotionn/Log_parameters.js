/**
 * Log parameters
 *
 * @param {VC:Datastore} datastore
 * @param {string} transform
 */
System.log("Parameters selected: ");
if (datastore != null) {
	System.log("Datastore : " + datastore);
}
else {
	System.log("No datastore specified");
}

if (transform != null) {
	System.log("Transform : " + transform);
}
else {
	System.log("No transform specified");
}