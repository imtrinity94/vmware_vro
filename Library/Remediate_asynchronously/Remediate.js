/**
 * Remediate
 *
 * @param {Array/VUM:VIInventory} entities
 * @param {Array/VUM:Baseline} baselines
 * @param {Array/VUM:PatchInfo} excludedPatches
 * @return {boolean} tasksCreated
 */
var ret = VumObjectManager.remediateAsync(entities , baselines , excludedPatches);tasksCreated = null != ret && ret.length > 0;