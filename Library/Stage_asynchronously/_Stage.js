/**
 * Stage
 *
 * @param {Array/VUM:VIInventory} entities
 * @param {Array/VUM:Baseline} baselines
 * @param {Array/VUM:PatchInfo} patches
 * @return {boolean} tasksCreated
 */
var ret = VumObjectManager.stageAsync(entities , baselines , patches);
tasksCreated = null != ret && ret.length > 0;