/**
 * Stage
 *
 * @param {Array/VUM:VIInventory} entities
 * @param {Array/VUM:Baseline} baselines
 * @param {Array/VUM:PatchInfo} patches
 * @return {String} text
 */
var	s = VumObjectManager.stage(entities , baselines , patches);
if (s) {
	text = 'Stage task(s) completed successfully';
} else {
	throw 'Stage task(s) failed';
}
