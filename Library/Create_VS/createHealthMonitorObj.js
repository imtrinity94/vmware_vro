/**
 * createHealthMonitorObj
 *
 * @param {string} healthMonitorType - [object Object]
 * @param {string} hm_type - [object Object]
 * @param {string} hm_name - [object Object]
 * @param {string} hm_description - [object Object]
 * @param {boolean} is_federated - [object Object]
 * @param {number} monitor_port - [object Object]
 * @param {number} time_out - [object Object]
 * @param {number} send_interval - [object Object]
 * @param {number} successful_check - [object Object]
 * @param {number} failed_check - [object Object]
 * @param {string} command_code - [object Object]
 * @param {string} udp_request - [object Object]
 * @param {string} dns_query_name - [object Object]
 * @param {Array/string} http_response_code - [object Object]
 * @param {string} tcp_request - [object Object]
 * @param {string} tcp_response - [object Object]
 * @param {boolean} tcp_half_open - [object Object]
 * @param {string} maintenance_code - [object Object]
 * @param {Array/string} https_response_code - [object Object]
 * @param {string} Tenant - [object Object]
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} health_monitor_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createHealthMonitorObj(healthMonitorType,hm_type,hm_name,hm_description,is_federated,monitor_port,time_out,send_interval,successful_check,failed_check,command_code,udp_request,dns_query_name,http_response_code,tcp_request,tcp_response,tcp_half_open,maintenance_code,workflowRuntime,https_response_code, Tenant, health_monitor_uuid) ;