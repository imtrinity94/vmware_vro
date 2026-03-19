/**
 * Power Off VM
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {number} sleepTime
 */
var powerTask = vCenterVM.powerOffVM_Task();
while(powerTask.info.state.value=="running" || powerTask.info.state.value=="queued") {
    System.sleep(sleepTime);
}
if (powerTask.info.state.value == "error") {
    System.log("Power off vm failed: " + powerTask.info.error.localizedMessage);
    throw "Power off vm failed";
}
