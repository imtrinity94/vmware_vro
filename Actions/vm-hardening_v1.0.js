var VcVMConfigSpec = new VcVirtualMachineConfigSpec();  
var changeValue = new Array();
System.log ("Config From Array:");
for (var i = 0; i <  VcVmConfig.length; i++) {
	System.log ("Name: " + VcVmConfig[i].key + " - " + "Value: " + VcVmConfig[i].value);
	changeValue[i] = new VcOptionValue();
	changeValue[i].key = VcVmConfig[i].key;
	changeValue[i].value = VcVmConfig[i].value;
}

VcVMConfigSpec.extraConfig = changeValue;
System.log ("Number of VM to Process:" + VcVmS.length);

for (var j = 0; j <  VcVmS.length; j++) {
System.log ("VM to Set Options:" + VcVmS[j].Name);
ConfigTask = VcVmS[j].reconfigVM_Task(VcVMConfigSpec);
try {
		var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(ConfigTask,progress,pollrate);
		System.log("Config performed for VM : " + VcVmS[j].name);
		Server.log("Config performed for VM : " + VcVmS[j].name);
	}
	catch (e) {
		System.error("Config failed for VM : " + VcVmS[j].name + ". Reason: " + e);
		Server.error("Config failed for VM : " + VcVmS[j].name + ". Reason: " + e);
	}
MoveTask = VcVmS[j].relocateVM_Task(relocateSpec);
try {
	var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(MoveTask,progress,pollrate);
	System.log("vMotion/storage vMotion performed for VM : " + VcVmS[j].name);
	Server.log("vMotion/storage vMotion performed for VM : " + VcVmS[j].name);
	}
	catch (e) {
		System.error("vMotion/storage vMotion failed for VM : " + VcVmS[j].name + ". Reason: " + e);
		Server.error("vMotion/storage vMotion failed for VM : " + VcVmS[j].name + ". Reason: " + e);
	}
}
