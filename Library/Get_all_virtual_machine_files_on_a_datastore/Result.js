/**
 * Result
 *
 * @param {Array/string} vms
 * @return {Properties} vmFiles
 */
var vmProp = new Properties();

for (var i = 0; i < vms.length; i++) {
    vmProp.put(vms[i], vms[i]);
}

vmFiles = vmProp;