/**
 * createVsVIPObj
 *
 * @param {boolean} autoAllocateFloatingIp
 * @param {boolean} autoAllocateIp
 * @param {boolean} aviAllocatedFIp
 * @param {boolean} aviAllocatedVip
 * @param {boolean} eastWestPlacement
 * @param {boolean} enabled
 * @param {string} IPAddress - [object Object]
 * @param {string} name - [object Object]
 * @param {string} ServerCloud
 * @param {string} Tenant - [object Object]
 * @param {string} tier1
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createVsVIPObj(Tenant,name,IPAddress,eastWestPlacement,aviAllocatedFIp,autoAllocateIp,enabled,autoAllocateFloatingIp,aviAllocatedVip,workflowRuntime,tier1,ServerCloud) ;