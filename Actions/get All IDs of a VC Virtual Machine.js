/**
 * Retrieves various UUIDs and BIOS IDs for a vCenter Virtual Machine.
 * Returns vCenter MoRef, SCCM BIOS ID, OS BIOS ID, Instance UUID, and BIOS ID.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm Virtual Machine Object.
 * @returns {Properties} Properties containing moRef, SCCMBiosID, OSBiosID, InstanceUUID, and BiosID.
 */

var val2return = new Properties();

if (vm) {
    var vm_instance_id = vm.config.instanceUuid;
    var vm_bios_id = vm.config.uuid;
    var os_bios_id = "";
    var sccm_bios_id = "";
    var moRef = vm.id;

    var temp_bios = "";
    var temp_bios_arr = [];

    var parts = vm_bios_id.split("-");
    for each (var item in parts) {
        temp_bios = temp_bios + item;
    }

    var sub_start = 0;
    do {
        temp_bios_arr.push(temp_bios.substring(sub_start, sub_start + 2));
        sub_start = sub_start + 2;
    } while (sub_start + 2 <= temp_bios.length);

    sccm_bios_id = temp_bios_arr[3];
    sccm_bios_id += temp_bios_arr[2];
    sccm_bios_id += temp_bios_arr[1];
    sccm_bios_id += temp_bios_arr[0];
    sccm_bios_id += "-";
    sccm_bios_id += temp_bios_arr[5];
    sccm_bios_id += temp_bios_arr[4];
    sccm_bios_id += "-";
    sccm_bios_id += temp_bios_arr[7];
    sccm_bios_id += temp_bios_arr[6];
    sccm_bios_id += "-";
    sccm_bios_id += temp_bios_arr[8];
    sccm_bios_id += temp_bios_arr[9];
    sccm_bios_id += "-";
    sccm_bios_id += temp_bios_arr[10];
    sccm_bios_id += temp_bios_arr[11];
    sccm_bios_id += temp_bios_arr[12];
    sccm_bios_id += temp_bios_arr[13];
    sccm_bios_id += temp_bios_arr[14];
    sccm_bios_id += temp_bios_arr[15];
    sccm_bios_id = sccm_bios_id.toUpperCase();

    var item_crc = 0;
    for each (var byteItem in temp_bios_arr) {
        if (item_crc == 7) {
            os_bios_id = os_bios_id + byteItem + "-";
        } else {
            os_bios_id = os_bios_id + byteItem + " ";
        }
        item_crc++;
    }

    os_bios_id = "VMware-" + os_bios_id.trim();

    // results mapping
    val2return.put("moRef", moRef);
    val2return.put("SCCMBiosID", sccm_bios_id);
    val2return.put("OSBiosID", os_bios_id);
    val2return.put("InstanceUUID", vm_instance_id);
    val2return.put("BiosID", vm_bios_id);
}

return val2return;
