/**
 * @description Adds a virtual NIC to an existing virtual machine using a specified
 *              distributed virtual port group. Supports VMXNET3 and E1000E adapter types.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:VirtualMachine} VM - The target virtual machine to add the NIC to.
 * @param {VC:DistributedVirtualPortgroup} Portgroup - The distributed virtual port group to connect the NIC to.
 * @param {string} Type - The NIC adapter type. Accepted values: "VMXNET3" or "E1000E".
 * @returns {VC:Task} Task - The vCenter task object for the VM reconfiguration.
 */

try {
    System.log("Adding a virtual NIC to this VM with portgroup: " + Portgroup.name);

    // Create connectable info for network
    var connectInfo = new VcVirtualDeviceConnectInfo();
    connectInfo.connected = true;
    connectInfo.startConnected = true;
    connectInfo.allowGuestControl = false;

    // Create Network BackingInfo
    var netBackingInfo = new VcVirtualEthernetCardDistributedVirtualPortBackingInfo();
    netBackingInfo.port = new VcDistributedVirtualSwitchPortConnection();
    netBackingInfo.port.switchUuid = Portgroup.config.distributedVirtualSwitch.uuid;
    netBackingInfo.port.portgroupKey = Portgroup.key;

    // Create VirtualNetwork adapter based on specified type
    if (Type.toUpperCase() === "VMXNET3") {
        vNetwork = new VcVirtualVmxnet3();
        System.log("VMXNET3 Virtual Adapter will be created");
    } else if (Type.toUpperCase() === "E1000E") {
        vNetwork = new VcVirtualE1000e();
        System.warn("VMXNET3 is recommended, but E1000E will be created");
    }

    vNetwork.backing = netBackingInfo;
    vNetwork.addressType = "Generated";
    vNetwork.connectable = connectInfo;

    // Create Network ConfigSpec
    var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
    deviceConfigSpec.device = vNetwork;
    deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

    var configSpec = new VcVirtualMachineConfigSpec();
    var configSpecArray = new Array();
    configSpecArray.push(deviceConfigSpec);
    configSpec.deviceChange = configSpecArray;

    // Run the task
    Task = VM.reconfigVM_Task(configSpec);
} catch (e) {
    System.error(e);
}
