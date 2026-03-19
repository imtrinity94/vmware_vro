/**
 * Set retry timer
 *
 * @param {Date} connectionTimer
 * @param {PowerShell:PowerShellHost} host
 * @param {number} waitBetweenAttempts
 * @return {boolean} psConnectionSuccess
 * @return {Date} connectionTimer
 */
var timeout = new Date();
timeout.setSeconds(timeout.getSeconds() + waitBetweenAttempts);

connectionTimer = timeout;
