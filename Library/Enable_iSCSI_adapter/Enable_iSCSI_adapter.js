/**
 * Enable iSCSI adapter
 *
 * @param {VC:HostSystem} host
 */
var hostStorageSystem = VcPlugin.toManagedObject( host, host.configManager.storageSystem );

hostStorageSystem.updateSoftwareInternetScsiEnabled(true);
System.log("The software iSCSI adaptor on host "+ host.name + " is enabled!");