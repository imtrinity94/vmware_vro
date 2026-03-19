/**
 * Returns New Registered VMs
 *
 * @param {Array/Array} newVMs
 * @return {Array/VC:VirtualMachine} VMList
 */
	var vms = new Array();
	var vmList = new Array();
	
	var index = 0;
	for(var i = 0 ; i < newVMs.length ; i++)
	{
		vms = newVMs[i];
		if(!vms || vms == null){
		}
		else{
			for(j=0;j<vms.length;j++){
				vmList[index] = vms[j];
				index++	
			}
			VMList = vmList;	
		}			
	}
	
