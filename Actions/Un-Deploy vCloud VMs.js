//The following script enables an array of VclVM objects to be un-deployed.

for(var i = 0; i < arrVclVm.length; i++)
	{
		var objVclVm;
		objVclVm = arrVclVm[i];

		if ( objVclVm.deployed == true )
		{
			var objVclTask;
			objVclTask = objVclVm.undeploy(VclUndeployPowerActionType.SHUTDOWN);

			objCustomActions.waitVclTask(objVclTask);

			objVclVm.updateInternalState();
		}
	}
