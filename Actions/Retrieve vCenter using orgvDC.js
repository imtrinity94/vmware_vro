/**
 * @description Retrieves the vCenter SDK connection associated with a vCloud Organization
 *              Virtual Data Center (orgVDC) by traversing the provider VDC and VIM server links.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclOrgVdc} orgVDC - The vCloud Organization VDC object to look up the vCenter for.
 * @returns {VC:SdkConnection} vCenter - The vCenter SDK connection associated with the orgVDC.
 */

var providerRef = orgVDC.toAdminObject().providerVdcReference;
var providerVdc = orgVDC.getHost().getEntityByReference(VclFinderType.PROVIDER_VDC, providerRef);
var vCenterServer = providerVdc.toAdminExtensionObject().vimServer.enumerate()[0];
var obj = orgVDC.getHost().getEntityByReference(VclFinderType.VIM_SERVER, vCenterServer);
var vcUuid = obj.uuid;
var vCenter = VcPlugin.findSdkConnectionForUUID(vcUuid);
