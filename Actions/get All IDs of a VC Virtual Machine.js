//Input vm of type VC:VirtualMachine
//Output Properties
/* Logs
moRef         vm-62388
SCCMBiosID    6D853542-D8EA-A71B-EC5E-E749E100E752
InstanceUUID  50354d00-6234-d31a-b7fc-c7683935e17d
OSBiosID      VMware-42 35 85 6d ea d8 1b a7-ec 5e e7 49 e1 00 e7 52
BiosID        4235856d-ead8-1ba7-ec5e-e749e100e752
*/

var val2return = new Properties

if (vm) {

    var vm_instance_id = vm.Config.InstanceUuid
    var vm_bios_id = vm.Config.Uuid
    var os_bios_id = ""
    var sccm_bios_id = ""
    var moRef = vm.id


    var temp_bios = ""
    var temp_bios_arr = []

    for each (item in vm_bios_id.split("-")) {

        temp_bios = temp_bios + item

    }

    var sub_start = 0

    do {

        temp_bios_arr.push(temp_bios.substring(sub_start,sub_start + 2))
        sub_start = sub_start + 2

    } while (sub_start + 2 <= temp_bios.length)


    sccm_bios_id = temp_bios_arr[3]
    sccm_bios_id += temp_bios_arr[2]
    sccm_bios_id += temp_bios_arr[1]
    sccm_bios_id += temp_bios_arr[0]
    sccm_bios_id += "-"
    sccm_bios_id += temp_bios_arr[5]
    sccm_bios_id += temp_bios_arr[4]
    sccm_bios_id += "-"
    sccm_bios_id += temp_bios_arr[7]
    sccm_bios_id += temp_bios_arr[6]
    sccm_bios_id += "-"
    sccm_bios_id += temp_bios_arr[8]
    sccm_bios_id += temp_bios_arr[9]
    sccm_bios_id += "-"
    sccm_bios_id += temp_bios_arr[10]
    sccm_bios_id += temp_bios_arr[11]
    sccm_bios_id += temp_bios_arr[12]
    sccm_bios_id += temp_bios_arr[13]
    sccm_bios_id += temp_bios_arr[14]
    sccm_bios_id += temp_bios_arr[15]
    sccm_bios_id = sccm_bios_id.toUpperCase()

    var item_crc = 0

    for each (item in temp_bios_arr) {

        if (item_crc == 7) {

            os_bios_id = os_bios_id + item + "-"

        } else {

            os_bios_id = os_bios_id + item + " "

        }

        item_crc++
        
    }

    os_bios_id = "VMware-" + os_bios_id.trim()

    // the moid of the VM
    val2return.moRef = moRef

    // show with "wmic path win32_computersystemproduct get uuid" and found in the SCCM DB in the "SMBIOS_GUID0" Column
    val2return.SCCMBiosID = sccm_bios_id
    
    // windows: "wmic bios get serialnumber" and linux: "dmidecode -s system-serial-number"
    val2return.OSBiosID = os_bios_id

    // Used in vRA to find the vCenter VM
    val2return.InstanceUUID = vm_instance_id

    val2return.BiosID = vm_bios_id

}

return val2return
