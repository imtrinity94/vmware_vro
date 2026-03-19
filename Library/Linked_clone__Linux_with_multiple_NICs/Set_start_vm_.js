/**
 * Set start vm?
 *
 * @param {boolean} doSysprep
 * @param {boolean} powerOn
 * @param {boolean} template
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