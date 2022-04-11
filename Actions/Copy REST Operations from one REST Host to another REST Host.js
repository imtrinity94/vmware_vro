var arrRESTOperations;
	arrRESTOperations = objRESTHostCLDLTM2C8A51.getOperations();

for ( var i = 0; i < arrRESTOperations.length; i++ )
{
	var strRESTOperation;
	strRESTOperation = arrRESTOperations[i];

	var objRESTOperation;
	objRESTOperation = objRESTHostSOURCE.getOperation(strRESTOperation);

	System.log(objRESTOperation.name);

	var objRESTOperationDESTINATION;
        objRESTOperationDESTINATION = objRESTHostDESTINATION.addOperation(objRESTOperation);

        RESTHostManager.updateHost(objRESTHostDESTINATION);
}
