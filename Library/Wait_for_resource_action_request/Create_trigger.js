/**
 * Create trigger
 *
 * @param {vCACCAFE:ResourceActionRequest} request
 * @param {number} timeout
 * @return {Trigger} trigger
 */
System.log("Creating trigger for resource action request '" + request.vcoId + "'...")
trigger = vCACCAFERequestsHelper.createTriggerForResourceActionRequest(request, timeout);
System.log("Trigger created.")