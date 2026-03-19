/**
 * Add operation
 *
 * @param {string} name
 * @param {string} urlTemplate
 * @param {string} method
 * @param {REST:RESTOperation} operation
 * @param {string} defaultContentType
 * @return {REST:RESTOperation} updatedOperation
 * @return {string} errorCode
 */
//clone the old operation
var newOperation = operation.clone();
newOperation.name = name;
newOperation.method = method;
newOperation.urlTemplate = urlTemplate;
newOperation.defaultContentType = defaultContentType;
//save the clone as an update of the original operation
System.log("op: " + newOperation);
System.log("host: " + operation.host);
updatedOperation = operation.host.updateOperation(newOperation);
System.log("new operation: " + updatedOperation);
RESTHostManager.updateHost(operation.host);
