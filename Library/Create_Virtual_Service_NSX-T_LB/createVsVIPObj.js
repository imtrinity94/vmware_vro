/**
 * createVsVIPObj
 *
 * @param {string} Tenant - [object Object]
 * @param {string} name - [object Object]
 * @param {string} IPAddress - [object Object]
 * @param {boolean} autoAllocateIp
 * @param {boolean} autoAllocateFloatingIp
 * @param {boolean} aviAllocatedFIp
 * @param {boolean} enabled
 * @param {boolean} eastWestPlacement
 * @param {boolean} aviAllocatedVip
 * @param {string} ServerCloud - [object Object]
 * @param {string} tier1
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} vsvip_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createVsVIPObj(Tenant,name,IPAddress,eastWestPlacement,aviAllocatedFIp,autoAllocateIp,enabled,autoAllocateFloatingIp,aviAllocatedVip,workflowRuntime,tier1,ServerCloud, vsvip_uuid) ;