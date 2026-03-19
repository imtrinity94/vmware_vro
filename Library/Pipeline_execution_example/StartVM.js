/**
 * Auto generated.
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {boolean} psConfirm
 * @param {boolean} psDebug
 * @param {PowerShell:PowerShellRemotePSObject} psErrorAction
 * @param {string} psErrorVariable
 * @param {number} psOutBuffer
 * @param {string} psOutVariable
 * @param {boolean} psRunAsync
 * @param {PowerShell:PowerShellRemotePSObject} psServer
 * @param {boolean} psVerbose
 * @param {PowerShell:PowerShellRemotePSObject} psVM
 * @param {boolean} psWhatIf
 * @param {string} sessionId
 * @return {PowerShell:PowerShellRemotePSObject} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.powershell.generated").startVM(host,sessionId,psVM,psRunAsync,psServer,psVerbose,psDebug,psErrorAction,psErrorVariable,psOutVariable,psOutBuffer,psWhatIf,psConfirm) ;