/**
 * Add operation
 *
 * @param {REST:RESTHost} host
 * @param {string} method
 * @param {string} name
 * @param {string} urlTemplate
 * @param {string} defaultContentType
 * @return {REST:RESTOperation} operation
 */
//create
var op = new RESTOperation(name);
op.method = method;
op.urlTemplate = urlTemplate;
op.defaultContentType = defaultContentType;
System.log("op: " + op);
//attach to host
System.log("host: " + host);
operation = host.addOperation(op);
RESTHostManager.updateHost(host);
