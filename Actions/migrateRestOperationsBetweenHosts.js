/**
 * @description Copies all REST operations from a source REST Host to a destination REST Host.
 *              Iterates through all operations on the source host and adds each to the destination.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {REST:RESTHost} restHostToEnumerate - The REST host to read operation names from.
 * @param {REST:RESTHost} sourceRestHost - The source REST host to retrieve operation definitions.
 * @param {REST:RESTHost} destinationRestHost - The destination REST host to copy operations into.
 * @returns {void}
 */

var operationNamesArray = restHostToEnumerate.getOperations();

var i;
for (i = 0; i < operationNamesArray.length; i++) {
    var operationName = operationNamesArray[i];
    var sourceOperation = sourceRestHost.getOperation(operationName);

    if (sourceOperation) {
        System.log("Copying operation: " + sourceOperation.name);
        destinationRestHost.addOperation(sourceOperation);
        RESTHostManager.updateHost(destinationRestHost);
    }
}

return null;
