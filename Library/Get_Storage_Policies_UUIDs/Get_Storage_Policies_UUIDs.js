/**
 * Get Storage Policies UUIDs
 *
 * @param {string} cookie
 * @param {REST:RESTHost} pbmHost
 * @param {Array/string} storagePolicies
 * @return {Array/string} storagePoliciesUuids
 */
var policies = System.getModule("com.vmware.library.spbm").getAllStoragePolicies(pbmHost, cookie);
var policiesNameToUuidMap = new Object();
policiesNameToUuidMap["default"] = "default";
for each (var policy in policies) {
    policiesNameToUuidMap[policy.name] = policy.uuid;
}
storagePoliciesUuids = new Array();
for (var i in storagePolicies) {
    storagePoliciesUuids[i] = policiesNameToUuidMap[storagePolicies[i]];
    if (storagePoliciesUuids[i] == null || storagePoliciesUuids[i].length == 0) {
        throw "Can't find the storage policy: " + storagePolicies[i];
    }
    System.log("Storage policy name: " + storagePolicies[i] + " uuid: " + storagePoliciesUuids[i]);
}
