/**
 * Prepare Properties
 *
 * @param {Array/string} storageObjects
 * @param {Array/string} storagePolicies
 * @param {VC:Datastore} vmHomeDatastore
 * @param {Array/VC:Datastore} disksDatastores
 * @return {Array/string} propertiesNames
 * @return {Array/string} propertiesValues
 * @return {Properties} virtualMachineAddOrUpdateProperties
 */
propertiesNames = new Array();
propertiesValues = new Array();

for (var i in storageObjects) {
    if (storageObjects[i] == "vmhome") {
        propertiesNames.push("VMHomeStoragePolicy");
        if (storagePolicies[i] == "default") {
            propertiesValues.push("Datastore Default");
        } else {
            propertiesValues.push(storagePolicies[i]);
        }
        propertiesNames.push("VirtualMachine.Storage.Name");
        propertiesValues.push(vmHomeDatastore.name);
    } else {
        var diskIndex = parseInt(storageObjects[i].substr(4));
        propertiesNames.push("VirtualMachine.Disk" + diskIndex + ".DiskStoragePolicy");
        if (storagePolicies[i] == "default") {
            propertiesValues.push("Datastore Default");
        } else {
            propertiesValues.push(storagePolicies[i]);
        }
        propertiesNames.push("VirtualMachine.Disk" + diskIndex + ".Storage");
        propertiesValues.push(disksDatastores[diskIndex].name);
    }
}

virtualMachineAddOrUpdateProperties = new Properties();
for (var i in propertiesNames) {
	virtualMachineAddOrUpdateProperties.put(propertiesNames[i], propertiesValues[i]);
	System.log(propertiesNames[i] + ": " + propertiesValues[i]);
}

