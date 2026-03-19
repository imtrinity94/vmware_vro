/**
 * Set VM
 *
 * @param {Array/VC:VirtualMachine} allVMs
 * @param {number} currentVM
 * @param {string} snapNamePrefix
 * @return {VC:VirtualMachine} activeVM
 * @return {string} snapName
 */
// Set our activeVM object:
var activeVM = allVMs[currentVM];

var date = new Date();

snapName = snapNamePrefix + " " + date.toGMTString();