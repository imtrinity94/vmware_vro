/**
 * Get Compliance
 *
 * @param {Array/VUM:Baseline} baselines
 * @param {VUM:ComplianceStatus} complianceStatus
 * @param {Array/VUM:VIInventory} entities
 * @return {Array/VUM:Compliance} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vmware_update_manager").getCompliance(baselines,complianceStatus,entities) ;