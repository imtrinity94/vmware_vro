/**
 * Simple task with custom script capability.
 *
 * @param {string} errorCode
 * @param {string} identityHost
 */
System.error("'Import a certificate from URL' workflow failed with error '" + errorCode + "'");
throw "Failed to import a certificate from " + identityHost;