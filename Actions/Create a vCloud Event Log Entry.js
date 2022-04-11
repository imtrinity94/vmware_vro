var objVclEvent;
	objVclEvent = new VclEvent();
	objVclEvent.type = "Task";
	objVclEvent.typeFull = strErrorMessage;
	objVclEvent.serviceNamespace = "vcloudblogger.co.in";
	objVclEvent.success = true;
	objVclEvent.owner = objVclUser.getReference();
	objVclEvent.user = objVclUser.getReference();

var objVclAdminOrganization;
	objVclAdminOrganization = objVclOrganization.toAdminObject();
	objVclAdminOrganization.createEvent(objVclEvent);
