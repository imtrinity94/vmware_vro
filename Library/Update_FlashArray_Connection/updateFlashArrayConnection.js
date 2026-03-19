/**
 * Add a FlashArray Connection to the plug-in's configuration file.
 *
 * @param {PS:FlashArrayConnection} connection - [object Object]
 * @param {string} newName - [object Object]
 * @param {string} newBaseUrl - [object Object]
 * @param {string} newUsername - [object Object]
 * @param {SecureString} newPassword - [object Object]
 * @return {PS:FlashArrayConnection} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.connection").updateFlashArrayConnection(connection,newName,newBaseUrl,newUsername,newPassword) ;