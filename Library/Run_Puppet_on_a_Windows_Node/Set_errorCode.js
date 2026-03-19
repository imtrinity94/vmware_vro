/**
 * Set errorCode
 *
 * @param {number} puppetRunExitCode
 * @param {string} errorCode
 * @return {string} errorCode
 * @return {boolean} failed
 */
errorCode += "\n" + "The maximum number of puppet runs has occured. Last puppet run exit code: " + puppetRunExitCode;
failed = true;