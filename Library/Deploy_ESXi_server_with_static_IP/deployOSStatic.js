/**
 * Add a note to the workflow schema.
 *
 * @param {LenovoXClarityIntegrator:XClarityServer} xClarityServer - [object Object]
 * @param {string} osImageProfile - [object Object]
 * @param {string} selectedStorage - [object Object]
 * @param {string} selectHostMac - [object Object]
 * @param {string} dns1
 * @param {string} dns2
 * @param {string} ipAddress - [object Object]
 * @param {string} subnetMask - [object Object]
 * @param {string} gateway - [object Object]
 * @param {number} vLanId - [object Object]
 * @return {LenovoXClarityIntegrator:XClarityTask} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.lenovo.library.xclarity").deployOSStatic(xClarityServer,osImageProfile,selectedStorage,selectHostMac,dns1,dns2,ipAddress,subnetMask,gateway,vLanId);
