/**
 * @description Creates a custom event log entry in a vCloud Director organization.
 *              The event is associated with a specified user and organization.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclUser} objVclUser - The vCloud user to associate with the event.
 * @param {VclOrg} objVclOrganization - The vCloud organization in which to create the event.
 * @param {string} strErrorMessage - The message or type description for the event entry.
 * @returns {void}
 */

var objVclEvent = new VclEvent();
objVclEvent.type = "Task";
objVclEvent.typeFull = strErrorMessage;
objVclEvent.serviceNamespace = "cloudblogger.co.in";
objVclEvent.success = true;
objVclEvent.owner = objVclUser.getReference();
objVclEvent.user = objVclUser.getReference();

var objVclAdminOrganization = objVclOrganization.toAdminObject();
objVclAdminOrganization.createEvent(objVclEvent);
