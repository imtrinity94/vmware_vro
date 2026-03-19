/**
 * unpack vm arrays
 *
 * @param {Array/Array} vmsByHost
 * @return {Array/VC:VirtualMachine} vms
 */
vms = new Array();

for (host in vmsByHost) {
    var a = vmsByHost[host];
    for(vm in a) {
        vms.push(a[vm]);
    }
}