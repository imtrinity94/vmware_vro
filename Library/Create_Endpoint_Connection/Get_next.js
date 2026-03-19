/**
 * Get next
 *
 * @param {number} attrCurrentIndex
 * @param {Array/CompositeType(id:string,index:number,url:string,username:string,password:SecureString,priority:number):ConnectionInfo} attrFailoverEndpoints
 * @return {string} attrEndpointId
 * @return {number} attrEndpointIndex
 * @return {string} attrEndpointUrl
 * @return {string} attrEndpointUsername
 * @return {SecureString} attrEndpointPassword
 * @return {number} attrEndpointPriority
 */
attrEndpointId = attrFailoverEndpoints[attrCurrentIndex].id;
attrEndpointIndex = attrFailoverEndpoints[attrCurrentIndex].index;
attrEndpointUrl = attrFailoverEndpoints[attrCurrentIndex].url;
attrEndpointUsername = attrFailoverEndpoints[attrCurrentIndex].username;
attrEndpointPassword = attrFailoverEndpoints[attrCurrentIndex].password;
attrEndpointPriority = attrFailoverEndpoints[attrCurrentIndex].priority;
