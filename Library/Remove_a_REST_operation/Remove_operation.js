/**
 * Remove operation
 *
 * @param {REST:RESTOperation} operation
 * @return {string} removedOperation
 */
var host = operation.host;

host.removeOperation(operation.id);

RESTHostManager.updateHost(host);

removedOperation = operation;