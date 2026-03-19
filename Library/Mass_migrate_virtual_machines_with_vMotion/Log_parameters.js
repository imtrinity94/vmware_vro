/**
 * Log parameters
 *
 * @param {VC:Datastore} datastore
 * @param {VC:HostSystem} host
 * @param {VC:ResourcePool} pool
 * @param {string} transform
 */
System.log("Parameters selected: ");
if (datastore != null) {
	System.log("Datastore : " + datastore);
}
else {
	System.log("No datastore specified");
}
if (host != null) {
System.log("Host : " + host);
}
else {
	System.log("No host specified");
}
if (pool != null) {
System.log("pool : " + pool);
}
else {
	System.log("No pool specified");
}
if (transform != null) {
	System.log("Transform : " + transform);
}
else {
	System.log("No transform specified");
}