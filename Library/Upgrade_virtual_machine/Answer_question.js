/**
 * Answer question
 *
 * @param {VC:VirtualMachine} vm
 */
var question = vm.runtime.question;

questionId = question.id;
// Answer is to continue
vm.answerVM(questionId , "1");