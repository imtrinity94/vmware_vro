/**
 * Set errorCode
 *
 * @param {number} maxSSHAttempts
 * @param {string} errorCode
 * @return {string} errorCode
 * @return {boolean} failed
 */
errorCode += "\n" + "The maximum number of attempts to SSH into the VM has been reached. Max Attempts: " + maxSSHAttempts + ".";
failed = true;