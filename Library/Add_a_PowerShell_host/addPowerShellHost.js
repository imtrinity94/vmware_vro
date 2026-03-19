/**
 * Adds a PowerShell Host object to the plug-in's repository.
 *
 * @param {string} name - [object Object]
 * @param {string} type - [object Object]
 * @param {string} hostName - [object Object]
 * @param {string} transportProtocol - [object Object]
 * @param {string} port - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {string} sessionMode - [object Object]
 * @param {string} authentication - [object Object]
 * @param {string} shellCodePage - [object Object]
 * @param {number} idleTimeout - [object Object]
 * @param {number} readTimeout - [object Object]
 * @return {PowerShell:PowerShellHost} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.powershell.configuration").addPowerShellHost(name,type,hostName,transportProtocol,port,username,password,sessionMode,authentication,shellCodePage, idleTimeout, readTimeout) ;