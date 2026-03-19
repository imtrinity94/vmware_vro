/**
 * Log results
 *
 * @param {AutoDeploy:ADAnswerFile} answerFile
 * @return {AutoDeploy:ADAnswerFile} updatedAnswerFile
 */
if (answerFile == null) {
    System.log("No Answer file found!");
} else {
    System.log("->" + answerFile.getId());
    System.log("->" + answerFile.getMultiAdId());
    var inputParameters = answerFile.getUserInputParameters();
    System.log("Answer file details:");
    for(var i = 0; i < inputParameters.length; i++) {
        System.log("=== User Input Parameter " + (i + 1) + " ===");
        System.log("Profile path: " + inputParameters[i].profilePath);
        System.log("Policy ID: " + inputParameters[i].policyId);
        System.log("Parameter ID: " + inputParameters[i].parameterId);
        var keys = inputParameters[i].getParameterKeys();
        for(var j = 0; j < keys.length; j++) {
            System.log("Key: " + keys[j] + " Value: " + inputParameters[i].getKeyValue(keys[j]));
        }
    }
    updatedAnswerFile = answerFile;
}