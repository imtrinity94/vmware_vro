/**
 * Increment Counter
 *
 * @param {Array/VC:VirtualMachine} allVMs
 * @param {number} currentVM
 * @return {number} currentVM
 * @return {VC:VirtualMachine} activeVM
 */
currentVM++;
activeVM = allVMs[currentVM];
System.sleep(2000);