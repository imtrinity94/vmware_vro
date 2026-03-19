/**
 * Remediate
 *
 * @param {Array/VUM:VIInventory} entities
 * @param {Array/VUM:Baseline} baselines
 * @param {Array/VUM:PatchInfo} excludedPatches
 * @return {String} text
 */
var	s = VumObjectManager.remediate(entities , baselines , excludedPatches);
if (s) {
    text = 'Remediate task(s) completed successfully';
} else {
	text = 'Remediate task(s) failed';
	throw text;
}
