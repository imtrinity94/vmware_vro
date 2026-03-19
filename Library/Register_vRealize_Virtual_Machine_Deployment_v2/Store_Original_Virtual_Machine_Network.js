/**
 * Store Original Virtual Machine Network
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} networkAdapterId
 * @return {string} networkNameReservation
 */
System.debug("BEGIN: Store Original Virtual Machine Network")
// Adapter IDs begin at 1 but in case a 0 is sent, let's just increment it.
if (networkAdapterId == 0) networkAdapterId++;
var networkAdapter = "Network adapter " + networkAdapterId;
var devices = vm.config.hardware.device;

for each (device in devices){

    if (device.backing instanceof VcVirtualEthernetCardNetworkBackingInfo && device.deviceInfo.label == networkAdapter){
        networkNameReservation = device.deviceInfo.summary;
        break;
    }
}
System.debug("END: Store Original Virtual Machine Network")