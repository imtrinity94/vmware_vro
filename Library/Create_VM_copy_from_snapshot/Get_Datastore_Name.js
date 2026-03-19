/**
 * Get Datastore Name
 *
 * @param {VC:VirtualMachine} vm
 * @return {string} DatastoreName
 */
var ds = vm.datastore;
//To get six-digit Random Number.
while(true){
	var randomNo=Math.floor(Math.random() * 1000000);
 	if(randomNo > 99999 && randomNo < 1000000){
		break;
	}
}

DatastoreName = ds[0].name + "-" + randomNo;


