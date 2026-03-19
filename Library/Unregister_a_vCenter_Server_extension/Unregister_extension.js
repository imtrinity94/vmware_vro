/**
 * Unregister extension
 *
 * @param {VC:SdkConnection} sdkConnection
 * @param {string} address
 */
VcPlugin.unregisterExtension(sdkConnection, address);

System.log("Unregistered extension from host " + sdkConnection.id);
