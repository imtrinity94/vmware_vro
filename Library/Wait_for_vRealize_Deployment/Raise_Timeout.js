/**
 * Raise Timeout
 *
 * @param {string} deploymentName
 */
System.error("Failed to wait for the deployment (" + deploymentName + ") to become available in the vRealize Automation environment");
throw "Timeout waiting for Deployment";