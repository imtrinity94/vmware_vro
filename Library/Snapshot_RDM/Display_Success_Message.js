/**
 * Display Success Message
 *
 * @param {PS:Volume} FAVolume
 * @param {VC:VirtualMachine} sourceVM
 * @param {string} sourceRDM
 * @return {PS:Volume} rdmVolume
 */
rdmVolume = FAVolume;
System.log("Snpshot created successfully from RDM " + sourceRDM + " for VM " + sourceVM.name);