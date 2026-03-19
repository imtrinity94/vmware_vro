/**
 * Set errorCode
 *
 * @param {string} errorCode
 * @param {number} maxPuppetRuns
 * @return {string} errorCode
 * @return {boolean} failed
 */
errorCode += "\n" + "The maximum number of attempts to start the pxp-agent has been reached. Max Attempts: " + maxPuppetRuns + ".";
failed = true;