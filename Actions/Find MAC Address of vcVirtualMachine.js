var objVcVirtualMachineConfigInfo = objVcVirtualMachine.config;

var objVcVirtualHardware = objVcVirtualMachineConfigInfo.hardware;

var arrVcVirtualDevice = objVcVirtualHardware.device;

var strMacAddress = "";

for (var i in arrVcVirtualDevice) {
    var objVcVirtualDevice = arrVcVirtualDevice.pop();

    if (objVcVirtualDevice) {
        System.debug("currentDevice: " + objVcVirtualDevice);

        if (objVcVirtualDevice instanceof VcVirtualVmxnet3) {
            System.debug("found network card on " + objVcVirtualDevice);

            strMacAddress = objVcVirtualDevice.macAddress;

            exit;
        }
    }
}
