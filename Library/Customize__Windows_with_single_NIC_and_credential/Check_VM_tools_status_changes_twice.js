/**
 * Check VM tools status changes twice
 *
 * @param {VC:VirtualMachine} vm
 */
var fromTime = VcPlugin.currentTime(vm.sdkConnection);
var spec = new VcEventFilterSpec();
var entitySpec = new VcEventFilterSpecByEntity ();
entitySpec.entity = vm;
var recursionOption =  VcEventFilterSpecRecursionOption['self'];
var timeSpec = new  VcEventFilterSpecByTime();
timeSpec.beginTime = fromTime;
entitySpec.recursion = recursionOption;
spec.entity = entitySpec;
spec.time = timeSpec;
spec.eventTypeId = ['CustomizationSucceeded', 'CustomizationFailed'] ;
var finalEvents;
do {
   System.log("Waiting for customization to finish");
   System.sleep(5000);
   finalEvents = vm.sdkConnection.eventManager.queryEvents(spec);
   System.log("Customization end events received : " + finalEvents )
} while (finalEvents == undefined || finalEvents == null || finalEvents.length == 0);

System.log("Customization ended");
