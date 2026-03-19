/**
 * updateHealthMonitorObj
 *
 * @param {string} command_code
 * @param {string} dns_query_name
 * @param {number} failed_check - [object Object]
 * @param {string} healthMonitorType - [object Object]
 * @param {string} hm_description
 * @param {string} hm_name - [object Object]
 * @param {string} hm_type
 * @param {Array/string} http_response_code
 * @param {Array/string} https_response_code
 * @param {boolean} is_federated
 * @param {string} maintenance_code
 * @param {number} monitor_port - [object Object]
 * @param {number} send_interval - [object Object]
 * @param {number} successful_check - [object Object]
 * @param {boolean} tcp_half_open
 * @param {string} tcp_request
 * @param {string} tcp_response
 * @param {number} time_out - [object Object]
 * @param {string} udp_request
 * @param {string} Tenant - [object Object]
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").updateHealthMonitorObj(healthMonitorType,hm_type,hm_name,hm_description,is_federated,monitor_port,time_out,send_interval,successful_check,failed_check,command_code,udp_request,dns_query_name,http_response_code,tcp_request,tcp_response,tcp_half_open,maintenance_code,workflowRuntime,https_response_code, Tenant) ;