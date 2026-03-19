/**
 * Set question text
 *
 * @param {VC:VirtualMachine} vm
 * @return {string} questionText
 * @return {string} questionText2
 * @return {Array/string} answerList
 * @return {string} questionId
 * @return {Array/Any} choiceList
 */
// Set text to display in user interaction
var question = vm.runtime.question;

questionId = question.id;

questionText = question.text;
questionText2 = "Please choose: " + "\n";

// Set array of valid answers
choiceList=question.choice.choiceInfo;
// Set array of texts to display in presentation allowing user to choose response 
answerList = new Array();	
for (i in choiceList) {
	answerList.push(choiceList[i].label);
}
