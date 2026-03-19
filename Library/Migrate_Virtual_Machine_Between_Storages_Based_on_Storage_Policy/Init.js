/**
 * Init
 *
 * @param {number} waitTime
 * @param {VC:VirtualMachine} vCenterVM
 * @return {string} vcUrl
 * @return {string} vcName
 * @return {string} pbmUrl
 * @return {string} pbmName
 * @return {VC:SdkConnection} vCenter
 * @return {number} retryTime
 */
var vcIp = vCenterVM.sdkConnection.toString();

vcUrl = "https://" + vcIp + "/sdk/vimService";
System.log("vcUrl: " + vcUrl);
vcName = "provision-vcHost" + "-" + vCenterVM.name + "-" + vcIp;
System.log("vcName: " + vcName);
pbmUrl = "https://" + vcIp + "/pbm";
System.log("pbmUrl: " + pbmUrl);
pbmName = "provision-pbmHost" + "-" + vCenterVM.name + "-" + vcIp;
System.log("pbmName: " + pbmName);

vCenter = vCenterVM.sdkConnection;

retryTime = waitTime;