/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Machine} machine
 * @param {string} description
 * @param {string} name
 * @param {string} owner
 * @param {boolean} snapshotMemory
 * @param {Properties} customProperties
 * @return {VRA:RequestTracker} requestTracker
 */
var snapshotSpecification = new VraSnapshotSpecification();
snapshotSpecification.name = name;
snapshotSpecification.description = description
snapshotSpecification.id = machine.id;
snapshotSpecification.snapshotMemory=snapshotMemory;

var href = new VraHref();
href.addHrefsItem(machine.id);
snapshotSpecification.putLinksItem("snaphostHref", href);

//Add customproperties
for(var key in customProperties) {
    snapshotSpecification.putCustomPropertiesItem(key, customProperties[key]);
}

var machineService = machine.host.createInfrastructureClient().createMachineService();
requestTracker = machineService.createMachineSnapshot(machine.id, snapshotSpecification);
System.log("Create machine snapshot request has been successfully placed with request tracking id " + requestTracker.id)
