/**
 * Send Answer to VM
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 */
var questionId = vm.runtime.question.id;
vm.answerVM(questionId , 1);