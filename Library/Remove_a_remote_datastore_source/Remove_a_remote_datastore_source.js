/**
 * Remove a remote datastore source
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} VCHost
 * @param {string} Username
 * @param {SecureString} Password
 * @return {VC:Task} task
 */

var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (!vsanConnection) {
  throw "VsanConnectionError: Could not find vSAN connection for SDK connection [${cluster.sdkConnection.name}]";
}
//version check needed here
var vsan80u1supported = System.getModule("com.vmware.library.vsan").isVsan80u1Supported(cluster);
if (!vsan80u1supported) {
    throw "This feature supports starting from vSAN 80u1, you may need to use a VC version 80u1 or above"
}
var vsanHCIMeshDatastoreSource = new VsanVsanHciMeshDatastoreSource();
var vsanRemoteVcInfoStandalone = new VsanVsanRemoteVcInfoStandalone();
vsanRemoteVcInfoStandalone.password = Password;
vsanRemoteVcInfoStandalone.user = Username;
vsanRemoteVcInfoStandalone.vcHost = VCHost;
vsanRemoteVcInfoStandalone.linkType = "standalone";
vsanHCIMeshDatastoreSource.vcInfo = vsanRemoteVcInfoStandalone;

var _vsanRemoteDatastoreSystem = vsanConnection.vsanRemoteDatastoreSystem;

var precheckResult = _vsanRemoteDatastoreSystem.vsanPrecheckDatastoreSource(vsanHCIMeshDatastoreSource,"checkDestroyDs");
var result = precheckResult.result;
//System.log(result)
if (result != null && result.length != 0) {
    for (var i = 0; i < result.length; i++) {
        if (result[i].status != "green") {
            var inputString = result[i].toString();
            System.log(inputString);
            var startKeyword = "message =";
            var endKeyword = "}";
            var substrings = "";
            var startIndex = inputString.indexOf(startKeyword);
            while (startIndex !== -1) {
                var endIndex = inputString.indexOf(endKeyword, startIndex);
                if (endIndex !== -1) {
                    var substring = inputString.slice(startIndex + startKeyword.length, endIndex).trim();
                    System.log(substring)
                    substrings = substrings + " " + substring;
                    startIndex = inputString.indexOf(startKeyword, endIndex);
                } else {
                    break;
                }
            }
            if (substrings != null) {
                throw (substrings)
            } else {
                throw (result[i]);
            }      
        }        
    }
}

var taskTask = _vsanRemoteDatastoreSystem.vsanDestroyDatastoreSource(vsanHCIMeshDatastoreSource);

var task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, taskTask.value);


