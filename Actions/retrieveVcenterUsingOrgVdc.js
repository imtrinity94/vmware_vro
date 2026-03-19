/**
 * @description Retrieves the vCenter SDK connection associated with a vCloud Organization
 *              Virtual Data Center (orgVDC) by traversing the provider VDC and VIM server links.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VclOrgVdc} vcloudOrgVdc - The vCloud Organization VDC object to look up the vCenter for.
 * @returns {VC:SdkConnection|null} vcSdkConnection - The vCenter SDK connection associated with the orgVDC.
 */

if (!vcloudOrgVdc) {
    System.error("Input 'vcloudOrgVdc' is null. Cannot retrieve vCenter reference.");
    return null;
}

// Navigate to Admin Object to get Provider VDC reference
var pVdcReference = vcloudOrgVdc.toAdminObject().providerVdcReference;
if (!pVdcReference) {
    System.warn("Organizational VDC " + vcloudOrgVdc.name + " does not have an associated Provider VDC reference.");
    return null;
}

var vcloudHostHandle = vcloudOrgVdc.getHost();
var providerVdcObj = vcloudHostHandle.getEntityByReference(VclFinderType.PROVIDER_VDC, pVdcReference);

// Extract the VimServer (vCenter) reference from the Provider VDC admin extension
var vimServerRefList = providerVdcObj.toAdminExtensionObject().vimServer.enumerate();
if (!vimServerRefList || vimServerRefList.length === 0) {
    System.error("No VIM Server (vCenter) associated with Provider VDC: " + providerVdcObj.name);
    return null;
}

var primaryVimServerRef = vimServerRefList[0];
var vimServerEntity = vcloudHostHandle.getEntityByReference(VclFinderType.VIM_SERVER, primaryVimServerRef);

var targetVcUuid = vimServerEntity.uuid;
System.log("Resolved vCenter UUID " + targetVcUuid + " from Org VDC: " + vcloudOrgVdc.name);

// Find the corresponding vRS Orchestrator SDK connection for the discovered UUID
var vcSdkConnection = VcPlugin.findSdkConnectionForUUID(targetVcUuid);

if (vcSdkConnection) {
    System.log("Successfully matched vCenter SDK Connection: " + vcSdkConnection.name);
} else {
    System.warn("vCenter with UUID " + targetVcUuid + " is registered in vCloud but not in vRO vCenter Plugin.");
}

return vcSdkConnection;
