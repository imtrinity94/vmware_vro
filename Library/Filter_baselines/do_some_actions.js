/**
 * do some actions
 *
 * @param {Array/VUM:Baseline} baselines
 * @return {Array/VUM:Baseline} outBaselines
 */
outBaselines = baselines;
if (baselines != undefined && baselines.length > 0) {
    System.log(baselines.length + " baselines selected");
} else {
    System.log("No baselines found/selected");
}
