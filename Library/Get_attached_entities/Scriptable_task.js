/**
 * Scriptable task
 *
 * @param {Array/VUM:Baseline} baselines
 * @param {Array/VUM:BaselineGroup} baselineGroups
 * @param {string} serverURI
 * @return {Array/VUM:VIInventory} entities
 */
entities = [];

if (baselineGroups != undefined) {
	var e = VumObjectManager.getEntitiesByBaselineGroup(serverURI, baselineGroups);
	if (e != undefined && e.length>0) {
		for (var i in e) {
    		entities.push(e[i]);
		}
	}
}

if (baselines != undefined) {
	var e = VumObjectManager.getEntitiesByBaseline(serverURI, baselines);
	if (e != undefined && e.length>0) {
		for (var i in e) {
    		entities.push(e[i]);
		}
	}
}