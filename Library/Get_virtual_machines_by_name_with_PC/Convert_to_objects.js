/**
 * Convert to objects
 *
 * @param {Array/string} foundObjects
 * @return {Array/VC:VirtualMachine} vms
 */
vms = new Array()
for (var i in foundObjects) {
    vms.push(Server.fromUri(foundObjects[i]))
}