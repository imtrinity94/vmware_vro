/**
 * Set default vCenter server
 *
 * @param {string} defaultVcenter
 * @return {string} vumUrl
 */
VumObjectManager.changeDefaultServerTo(defaultVcenter);
System.log("The default vCenter server is set to: " + defaultVcenter);
// TODO: if successful, set vumUrl = defaultVcenter