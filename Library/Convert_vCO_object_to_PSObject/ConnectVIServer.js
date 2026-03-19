/**
 * Auto generated.
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {boolean} psDebug
 * @param {string} psErrorVariable
 * @param {boolean} psNotDefault
 * @param {number} psOutBuffer
 * @param {string} psOutVariable
 * @param {SecureString} psPassword
 * @param {number} psPort
 * @param {string} psProtocol
 * @param {boolean} psSaveCredentials
 * @param {Array/string} psServer
 * @param {string} psSession
 * @param {string} psUser
 * @param {boolean} psVerbose
 * @param {string} sessionId
 * @param {string} psWarningVariable
 * @param {PowerShell:PowerShellRemotePSObject} psWarningAction
 * @param {PowerShell:PowerShellRemotePSObject} psCredential
 * @param {PowerShell:PowerShellRemotePSObject} psErrorAction
 * @return {PowerShell:PowerShellRemotePSObject} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.powershell.generated").connectVIServer(host,sessionId,psServer,psPort,psProtocol,psCredential,psUser,psPassword,psSession,psNotDefault,psSaveCredentials,psVerbose,psDebug,psErrorAction,psWarningAction,psErrorVariable,psWarningVariable,psOutVariable,psOutBuffer) ;