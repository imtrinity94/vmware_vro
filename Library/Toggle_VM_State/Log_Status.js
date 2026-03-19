/**
 * Log Status
 *
 * @param {PowerShell:PowerShellRemotePSObject} curVm
 */
var  obj = curVm.getRootObject();
System.log(obj.getProperty('Name'));
System.log(obj.getProperty('PowerState').getToString());
