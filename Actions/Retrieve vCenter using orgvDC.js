var providerRef = orgVDC.toAdminObject().providerVdcReference;
var providerVdc = orgVDC.getHost().getEntityByReference(VclFinderType.PROVIDER_VDC, providerRef);
var vCenterServer = providerVdc.toAdminExtensionObject().vimServer.enumerate()[0];
var obj = orgVDC.getHost().getEntityByReference(VclFinderType.VIM_SERVER, vCenterServer);
var vcUuid = obj.uuid;
var vCenter = VcPlugin.findSdkConnectionForUUID(vcUuid);
