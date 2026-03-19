/**
 * do some actions
 *
 * @param {string} phrase
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Array/string} vendor
 * @param {Array/string} product
 * @param {Array/string} language
 * @param {Array/string} bundleType
 * @param {Array/string} installationImpact
 * @param {Array/VUM:Severity} severity
 * @param {Array/VUM:TargetType} targetType
 * @param {Array/VUM:UpdateType} updateType
 * @param {boolean} failOnManyUpdates
 * @param {string} serverURI
 * @param {Array/number} patchIds
 * @param {Array/VUM:Baseline} baselines
 * @param {Array/VUM:HostUpdateCategory} hostUpdateCategory
 * @return {Array/VUM:PatchInfo} outPatches
 */
outPatches = System.getModule("com.vmware.library.vmware_update_manager").getPatches(phrase, startDate, endDate, vendor, severity, targetType, updateType, language, failOnManyUpdates, serverURI, bundleType, installationImpact, patchIds, baselines, product, hostUpdateCategory);
if (outPatches != undefined && outPatches.length > 0) {
    System.log(outPatches.length + " patches selected");
} else {
    System.log("No patches found/selected");
}
