/**
 * Init
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {VC:SdkConnection} destVC
 * @param {number} waitTime
 * @return {string} vcUrl
 * @return {string} vcName
 * @return {string} pbmUrl
 * @return {string} pbmName
 * @return {Array/VC:HostSystem} destVCHosts
 * @return {VC:HostSystem} destVCHost
 * @return {number} retryTime
 */
var vcIp = destVC.toString();
vcUrl = "https://" + vcIp + "/sdk/vimService";
System.log("vcUrl: " + vcUrl);
vcName = "provision-vcHost" + "-" + vCenterVM.name + "-" + vcIp;
System.log("vcName: " + vcName);
pbmUrl = "https://" + vcIp + "/pbm";
System.log("pbmUrl: " + pbmUrl);
pbmName = "provision-pbmHost" + "-" + vCenterVM.name + "-" + vcIp;
System.log("pbmName: " + pbmName);

destVCHosts = destVC.allHostSystems;
if (destVCHosts == null || destVCHosts.length == 0) {
    throw "There isn't host in the vCenter";
}
destVCHosts.sort(function(a, b) { return b.vm.length - a.vm.length; });
destVCHost = destVCHosts.pop();

retryTime = waitTime;