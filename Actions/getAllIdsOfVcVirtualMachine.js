/**
 * Retrieves various UUIDs and BIOS IDs for a vCenter Virtual Machine.
 * Returns vCenter MoRef, SCCM BIOS ID, OS BIOS ID, Instance UUID, and BIOS ID.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vcVirtualMachine Virtual Machine Object.
 * @returns {Properties} vmIdsProperties - Properties containing moRef, SCCMBiosID, OSBiosID, InstanceUUID, and BiosID.
 */

var vmIdsProperties = new Properties();

if (vcVirtualMachine) {
    var instanceUuid = vcVirtualMachine.config.instanceUuid;
    var biosUuid = vcVirtualMachine.config.uuid;
    var osBiosId = "";
    var sccmBiosId = "";
    var moRefStr = vcVirtualMachine.id;

    var cleanedUuidStr = "";
    var uuidPartsList = biosUuid.split("-");
    
    var i;
    for (i = 0; i < uuidPartsList.length; i++) {
        cleanedUuidStr += uuidPartsList[i];
    }

    var hexPairsArray = [];
    var subStartIdx = 0;
    do {
        hexPairsArray.push(cleanedUuidStr.substring(subStartIdx, subStartIdx + 2));
        subStartIdx += 2;
    } while (subStartIdx + 2 <= cleanedUuidStr.length);

    // Construct SCCM BIOS ID (Little-endian for the first three groups)
    sccmBiosId = hexPairsArray[3] + hexPairsArray[2] + hexPairsArray[1] + hexPairsArray[0] + "-" +
                 hexPairsArray[5] + hexPairsArray[4] + "-" +
                 hexPairsArray[7] + hexPairsArray[6] + "-" +
                 hexPairsArray[8] + hexPairsArray[9] + "-" +
                 hexPairsArray[10] + hexPairsArray[11] + hexPairsArray[12] + hexPairsArray[13] + hexPairsArray[14] + hexPairsArray[15];
    sccmBiosId = sccmBiosId.toUpperCase();

    // Construct OS BIOS ID (Standard VMware format)
    var j;
    for (j = 0; j < hexPairsArray.length; j++) {
        var hexByte = hexPairsArray[j];
        if (j == 7) {
            osBiosId += hexByte + "-";
        } else {
            osBiosId += hexByte + " ";
        }
    }

    osBiosId = "VMware-" + osBiosId.trim();

    // Mapping results
    vmIdsProperties.put("moRef", moRefStr);
    vmIdsProperties.put("SCCMBiosID", sccmBiosId);
    vmIdsProperties.put("OSBiosID", osBiosId);
    vmIdsProperties.put("InstanceUUID", instanceUuid);
    vmIdsProperties.put("BiosID", biosUuid);
}

return vmIdsProperties;
