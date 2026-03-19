/**
 * Get VM Datastore
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {string} suffixName - [object Object]
 * @return {VC:Datastore} datastore
 * @return {string} timeStamp
 * @return {string} suffixName
 */
var ds = vm.datastore;
datastore = ds[0];

//Get Current Timestamp for vcenter side snapshot suffix
 var now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  timeStamp = day +"-"+month+"-"+year+ "_"+hour+":"+minute+":"+second;
//System.log("timeStamp :" +timeStamp);

while(true){
	var randomNo=Math.floor(Math.random() * 10000);
 	if(randomNo > 999 && randomNo < 10000){
		break;
	}
}

if(suffixName.length == 0){
vmName = vm.name;
suffixName = vmName+"-"+"quiesce"+"-"+randomNo;
System.debug("suffixName :" + suffixName);
}