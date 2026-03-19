/**
 * Logging results
 *
 * @param {Array/AutoDeploy:CheckItemResult} actionResult
 * @return {boolean} isCompliant
 */
if (actionResult != null && actionResult.length > 0) {
    System.log("Retrieved " + actionResult.length + " non-compliant items:\n");
    for(var i in actionResult) {
        System.log("Current item: (" + actionResult[i].currentItem.getItemRepresentation() + ")");
        System.log("Expected item: (" + actionResult[i].expectedItem.getItemRepresentation() + ")");
        System.log("---");
    }
    isCompliant = false;
} else {
    System.log("The host's items are in compliance with the specified rule set!");
    isCompliant = true;
}
