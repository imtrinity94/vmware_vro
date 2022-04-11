System.log("==================================================");
System.log("=============== List of All Files ================");
System.log("==================================================");

for ( var i = 0; i < objProperties.length; i++ )
{
	var strFileName;
		strFileName = objProperties[i];

	System.log("===== " + strFileName);
}

System.log("==================================================");

var arrVcSdkConnection;
	arrVcSdkConnection = VcPlugin.allSdkConnections;

var arrAllVcVirtualMachine;
	arrAllVcVirtualMachine = new Array();

var arrOrphanedVMs;
	arrOrphanedVMs = new Array();

for each (var objVcSdkConnection in arrVcSdkConnection)
{
	var arrVcVirtualMachine;
		arrVcVirtualMachine = objVcSdkConnection.getAllVirtualMachines();

	System.log("arrVcVirtualMachine.length: " + arrVcVirtualMachine.length);

	arrAllVcVirtualMachine = arrAllVcVirtualMachine.concat(arrVcVirtualMachine);

	System.log("arrAllVcVirtualMachine.length: " + arrAllVcVirtualMachine.length);	
}

System.log("FINAL arrAllVcVirtualMachine.length: " + arrAllVcVirtualMachine.length);	

for each (var objVcVirtualMachine in arrAllVcVirtualMachine)
{
	System.log("objVcVirtualMachine.name: " + objVcVirtualMachine.name);

	try
	{
		var strFileName;
			strFileName = objVcVirtualMachine.config.files.vmPathName;

		if ( objVcVirtualMachine.summary.runtime.connectionState == VcVirtualMachineConnectionState.orphaned )
		{
			arrOrphanedVMs.push(objVcVirtualMachine);
		}

		System.log("===== Removing File: " + strFileName);

		objProperties.remove(strFileName);
	}
	catch (strException)
	{
		try
		{
			System.error("Error getting files from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
		}
		catch (strException)
		{
			System.error("Error getting files from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
		}

		continue;
	}

	try
	{
		var objVcVirtualMachineConfigInfo;
			objVcVirtualMachineConfigInfo = objVcVirtualMachine.config;

		var objVcVirtualHardware;
			objVcVirtualHardware = objVcVirtualMachineConfigInfo.hardware;

		var arrVcVirtualDevice;
			arrVcVirtualDevice = objVcVirtualHardware.device;

		for each(var objVcVirtualDevice in arrVcVirtualDevice)
		{
			if (objVcVirtualDevice instanceof VcVirtualDisk)
			{
				try
				{
					var strDiskFileName;
						strDiskFileName = objVcVirtualDevice.backing.fileName;

					System.log("===== Removing File: " + strDiskFileName);

					objProperties.remove(strDiskFileName);
				}
				catch (strException)
				{
					try
					{
						System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
					}
					catch (strException)
					{
						System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
					}

					continue;
				}
			}
		}
	}
	catch (strException)
	{
		try
		{
			System.error("Error getting devices from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
		}
		catch (strException)
		{
			System.error("Error getting devices from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
		}

		continue;
	}

	var arrSnapShots;
		arrSnapShots = new Array();

	if (objVcVirtualMachine.snapshot)
	{
		var objVcVirtualMachineSnapShotInfo;
			objVcVirtualMachineSnapShotInfo = objVcVirtualMachine.snapshot;

		var arrVcVirtualMachineSnapShotTree;
			arrVcVirtualMachineSnapShotTree = objVcVirtualMachineSnapShotInfo.rootSnapshotList;

		for (i in arrVcVirtualMachineSnapShotTree)
		{
			getSnapshotsOfVM( arrVcVirtualMachineSnapShotTree[i] );
		}
	}

	if ( arrSnapShots.length > 0 )
	{
		for each ( var snapshotRef in arrSnapShots )
		{
			var objSnapShot;
				objSnapShot = VcPlugin.convertToVimManagedObject(objVcVirtualMachine, snapshotRef);

			var objVcVirtualMachineConfigInfo;
				objVcVirtualMachineConfigInfo = objSnapShot.config;

			var objVcVirtualHardware;
				objVcVirtualHardware = objVcVirtualMachineConfigInfo.hardware;

			var arrSnapShotDevice;
				arrSnapShotDevice = objVcVirtualHardware.device;			

			for each(var objSnapShotDevice in arrSnapShotDevice)
			{
				if (objSnapShotDevice instanceof VcVirtualDisk)
				{
					try
					{
						var strDiskFileName;
							strDiskFileName = objSnapShotDevice.backing.fileName;

						System.log("===== Removing File: " + strDiskFileName);

						objProperties.remove(strDiskFileName);
					}
					catch (strException)
					{
						try
						{
							System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
						}
						catch (strException)
						{
							System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
						}

						continue;
					}
				}
			}
		}
	}	
}

System.log("==================================================");
System.log("============= List of Orphaned Files =============");
System.log("==================================================");

var arrKeys = objProperties.keys;

for ( var i = 0; i < arrKeys.length; i++ )
{
	var strKey;
		strKey = arrKeys[i];

	System.log("===== File Name: " + strKey);
}

System.log("==================================================");

function getSnapshotsOfVM(tree)
{
	arrSnapShots.push(tree.snapshot);

	var trees = tree.childSnapshotList;

	if (trees != null)
	{
		for (index in trees)
		{
			if (trees[index] != null)
			{
				getSnapshotsOfVM(trees[index]);
			}
		}
	}
}

System.log("==================================================");
System.log("============== List of Orphaned VMs ==============");
System.log("==================================================");

for ( var i = 0; i < arrOrphanedVMs.length; i++ )
{
	var strOrphanedVM;
		strOrphanedVM = arrOrphanedVMs[i];

	System.log("===== Orphaned VM Name: " + strOrphanedVM);
}

System.log("==================================================");
