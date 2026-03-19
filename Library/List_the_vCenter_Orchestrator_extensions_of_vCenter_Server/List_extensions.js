/**
 * List extensions
 *
 * @param {VC:SdkConnection} sdkConnection
 */
var extensionList = sdkConnection.extensionManager.extensionList;
for (ext_idx in extensionList) {
	var ext = extensionList[ext_idx];
	if (ext.key == "com.vmware.vco") {
		System.log("Extension key: " + ext.key);
		for (info_idx in ext.server) {
			var info = ext.server[info_idx];
			System.log(info.adminEmail + ": " + info.url);
		}
	}
}
