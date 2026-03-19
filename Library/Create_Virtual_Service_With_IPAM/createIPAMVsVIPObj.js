/**
 * createIPAMVsVIPObj
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
 * @param {string} network_management_name
 * @param {string} cloud_name
 * @param {string} domain
 * @param {string} serverType
 * @param {string} app_domain_name
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} vsvip_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createIPAMVsVIPObj(Tenant,name,IPAddress,eastWestPlacement,aviAllocatedFIp,autoAllocateIp,enabled,autoAllocateFloatingIp,aviAllocatedVip,serverType,workflowRuntime,network_management_name,app_domain_name,domain,cloud_name, vsvip_uuid) ;