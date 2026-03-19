/**
 * Next VC Host
 *
 * @param {Array/VC:HostSystem} destVCHosts
 * @return {VC:HostSystem} destVCHost
 */
if (destVCHosts == null || destVCHosts.length == 0) {
    throw "Can't find compliant host for the virtual machine"
} else {
    destVCHost = destVCHosts.pop();
}