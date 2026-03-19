/**
 * Add a FlashArray Connection to the plug-in's configuration file.
 *
 * @param {string} name - [object Object]
 * @param {string} baseUrl - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} password - [object Object]
 * @return {PS:FlashArrayConnection} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.connection").addFlashArrayConnection(name,baseUrl,username,password) ;