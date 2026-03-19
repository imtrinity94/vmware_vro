/**
 * do some actions
 *
 * @param {Array/number} id
 * @param {Array/string} name
 * @param {Array/VUM:BaselineType} type
 * @param {Array/VUM:BaselineContentType} contentType
 * @param {Array/VUM:TargetType} targetType
 * @param {Array/VUM:VIInventory} entities
 * @param {string} serverURI
 * @param {boolean} inheritFromParent
 * @param {boolean} includeChild
 * @param {VUM:PatchInfo} patch
 * @return {Array/VUM:Baseline} outBaselines
 */
outBaselines = System.getModule("com.vmware.library.vmware_update_manager").getBaselines(id,name,type,contentType,targetType,serverURI,entities,inheritFromParent,includeChild,patch);

if (outBaselines != undefined && outBaselines.length > 0) {
    System.log(outBaselines.length + " baselines selected");
} else {
    System.log("No baselines found/selected");
}
