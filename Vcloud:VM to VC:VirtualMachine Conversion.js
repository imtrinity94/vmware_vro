//Input vCloudVM (Vcloud:VM)
//Output VCVM (VC:VirtualMachine)
///Vcloud:VM to VC:VirtualMachine Conversion
//VclVM to VcVirtualMachine Conversion

var vmId = vCloudVM.id.split(":")[3];
var XPath = "xpath:name[contains(.,('" + vmId + "'))]";
var vCenterServer = System.getModule("org.telus.xavient.util").getPluginObject("VC:SdkConnection",["isLocal","isPrimary"]);
var allVMs = vCenterServer.getAllVirtualMachines(null, XPath);
if (allVMs.length != 0) {
    for each(var vm in allVMs) {
        VCVM = vm;
        var VM_NAME = vm.name;
        System.log("[Info]: Found Virtual Machine in vCenter: " + VCVM.name);
        break;
    }
} else {
    System.warn("ERROR: VM Not Found with the id: '" + vmId + "'");
    throw "ERROR: VM Not Found with the id: '" + vmId + "'";
}
	
