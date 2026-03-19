/**
 * do some actions
 *
 * @param {Array/VUM:PatchInfo} patches
 * @return {Array/VUM:PatchInfo} outPatches
 */
outPatches = patches;
if (patches != undefined && patches.length > 0) {
    System.log(patches.length + " patches selected");
} else {
    System.log("No patches found/selected");
}
