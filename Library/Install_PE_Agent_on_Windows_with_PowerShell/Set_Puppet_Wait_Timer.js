/**
 * Set Puppet Wait Timer
 *
 * @param {number} puppetRunInterval
 * @param {Date} puppetRunTimer
 * @return {Date} puppetRunTimer
 */
var timeout = new Date();
timeout.setSeconds(timeout.getSeconds() + puppetRunInterval);

puppetRunTimer = timeout;