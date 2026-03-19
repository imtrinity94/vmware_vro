/**
 * Adds a database object to the plug-in's inventory.
 *
 * @param {string} name
 * @param {string} type
 * @param {string} connectionURL
 * @param {string} username
 * @param {SecureString} password
 * @param {string} sessionMode
 * @return {SQL:Database} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.sql.configuration").addDatabase(name,type,connectionURL,username,password,sessionMode) ;