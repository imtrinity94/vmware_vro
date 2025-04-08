try
{
	var objProperties;
		objProperties = new Properties();

	var strRecurrencePattern = "Wed 22:00:00";

	// one-time: Ignores the recurrencePattern attribute
	// every-minutes: Seconds into each minute at which the task starts, for example, "00" or "00, 30" 
	// every-hours: Minutes and seconds into each hour at which the task starts, for example, "00:00" or "00:00, 30:00"
	// every-days: Time at which the task starts each day, for example, "18:30:00" or "12:00:00, 19:30:00"
	// every-weeks: Day and time at which the task starts each week, for example, "Mon 00:00:00" or "Mon 00:00:00, Wed 18:00:00"
	// every-months: Date and time at which the task starts each month, for example, "14 00:00:00" or "14 00:00:00, 28 18:00:00"

	var strRecurrenceCycle = "every-weeks";

	// one-time: Task runs once only.
	// every-minutes: Task runs every minute
	// every-hours: Task runs hourly
	// every-days: Task runs daily
	// every-weeks: Task runs weekly
	// every-months: Task runs monthly 

	var dteStartDate = new Date();
	var dteEndDate = new Date();
	var strUserName = "svc_cld_vmware";
	var strPassWord = "63QuqMj6eU";

	objWorkflow.scheduleRecurrently(objProperties, strRecurrencePattern, strRecurrenceCycle, objStartDate, objEndDate, strUserName, strPassWord);
}
catch ( objException )
{
	System.error ( objException );
}
