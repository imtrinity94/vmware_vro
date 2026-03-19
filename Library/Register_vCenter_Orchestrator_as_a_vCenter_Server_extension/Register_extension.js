/**
 * Register extension
 *
 * @param {VC:SdkConnection} sdkConnection
 * @param {string} address
 */
VcPlugin.registerExtension(sdkConnection, address);
System.log("Registered this extension with host " + sdkConnection.id);
