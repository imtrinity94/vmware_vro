/**
 * Clone operation
 *
 * @param {REST:RESTOperation} operation
 * @param {string} name
 * @param {string} urlTemplate
 * @param {string} method
 * @param {string} defaultContentType
 * @return {string} errorCode
 * @return {REST:RESTOperation} newOperation
 */
//create new operation
newOperation = operation.newOperationFromThis();
newOperation.name = name;
newOperation.urlTemplate = urlTemplate;
newOperation.method = method;
newOperation.defaultContentType = defaultContentType;
System.log("New operation: " + newOperation);
//save it to the host
operation.host.addOperation(newOperation);
RESTHostManager.updateHost(operation.host);