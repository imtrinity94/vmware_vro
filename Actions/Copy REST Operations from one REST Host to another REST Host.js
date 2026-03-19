/**
 * @description Copies all REST operations from a source REST Host to a destination REST Host.
 *              Iterates through all operations on the source host and adds each to the destination,
 *              saving the destination host after each addition.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {REST:RESTHost} objRESTHostCLDLTM2C8A51 - The REST host to read operation names from.
 * @param {REST:RESTHost} objRESTHostSOURCE - The source REST host to retrieve operation definitions.
 * @param {REST:RESTHost} objRESTHostDESTINATION - The destination REST host to copy operations into.
 * @returns {void}
 */

var arrRESTOperations = objRESTHostCLDLTM2C8A51.getOperations();

for (var i = 0; i < arrRESTOperations.length; i++) {
    var strRESTOperation = arrRESTOperations[i];

    var objRESTOperation = objRESTHostSOURCE.getOperation(strRESTOperation);

    System.log(objRESTOperation.name);

    var objRESTOperationDESTINATION = objRESTHostDESTINATION.addOperation(objRESTOperation);

    RESTHostManager.updateHost(objRESTHostDESTINATION);
}
