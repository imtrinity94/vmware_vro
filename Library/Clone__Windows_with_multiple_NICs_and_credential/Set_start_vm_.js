/**
 * Set start vm?
 *
 * @param {boolean} template
 * @param {boolean} powerOn
 * @param {boolean} doSysprep
 * @return {boolean} startVm
 */
if (template) {
	startVm = false;
}
else if (doSysprep) {
	startVm = true;
}
else {
	startVm = powerOn;
}