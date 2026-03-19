/**
 * Send answer to VM
 *
 * @param {VC:VirtualMachine} vm
 * @param {string} questionAnswer
 * @param {string} questionId
 * @param {Array/Any} choiceList
 * @param {number} pollRate
 */
// The user has selected a response, now we need to convert it back from the label to the key because the answerVM requires the key 
var theAnswer;
for (i in choiceList) {
	if (choiceList[i].label == questionAnswer){
		theAnswer = choiceList[i].key;
		System.log("Answer selected: "  + choiceList[i].key + " (The text the user selected was: " + questionAnswer + ")");
		break;
	}
}

vm.answerVM(questionId , theAnswer);