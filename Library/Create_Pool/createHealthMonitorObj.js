/**
 * createHealthMonitorObj
 *
 * @param {string} healthMonitorType
 * @param {string} hm_type
 * @param {string} hm_name
 * @param {string} hm_description
 * @param {boolean} is_federated
 * @param {number} monitor_port
 * @param {number} time_out
 * @param {number} send_interval
 * @param {number} successful_check
 * @param {number} failed_check
 * @param {string} command_code
 * @param {string} udp_request
 * @param {string} dns_query_name
 * @param {Array/string} http_response_code
 * @param {string} tcp_request
 * @param {string} tcp_response
 * @param {boolean} tcp_half_open
 * @param {string} maintenance_code
 * @param {Array/string} https_response_code
 * @param {string} Tenant - [object Object]
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} health_monitor_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createHealthMonitorObj(healthMonitorType,hm_type,hm_name,hm_description,is_federated,monitor_port,time_out,send_interval,successful_check,failed_check,command_code,udp_request,dns_query_name,http_response_code,tcp_request,tcp_response,tcp_half_open,maintenance_code,workflowRuntime,https_response_code, Tenant, health_monitor_uuid) ;