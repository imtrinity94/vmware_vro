/**
 * Simple task with custom script capability.
 *
 * @param {string} ipAddress
 */
var isReachable= false;
var timeout= 2700000; //miliseconds, i.e. maxium 45 mins for OS rebooting, should be long enough
var passedTime =0;
while(!isReachable && passedTime<timeout){
isReachable = System.isHostReachable(ipAddress,30);
System.sleep(15000);
passedTime+=15000;
}