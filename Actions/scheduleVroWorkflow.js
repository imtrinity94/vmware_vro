/**
 * Schedules a workflow to run recurrently based on the specified recurrence pattern and cycle.
 * 
 * @author Mayank Goyal
 * @version 1.0.0
 * 
 * @throws {Error} Logs any exceptions that occur during scheduling.
 */

// Start of the try block to handle exceptions
try {
    // Define properties for the workflow
    var objProperties = new Properties();

    // Define the recurrence pattern
    var strRecurrencePattern = "Wed 22:00:00";

    /**
     * Recurrence Pattern Examples:
     * - one-time: Ignores the recurrencePattern attribute.
     * - every-minutes: Seconds into each minute at which the task starts, e.g., "00" or "00, 30".
     * - every-hours: Minutes and seconds into each hour at which the task starts, e.g., "00:00" or "00:00, 30:00".
     * - every-days: Time at which the task starts each day, e.g., "18:30:00" or "12:00:00, 19:30:00".
     * - every-weeks: Day and time at which the task starts each week, e.g., "Mon 00:00:00" or "Mon 00:00:00, Wed 18:00:00".
     * - every-months: Date and time at which the task starts each month, e.g., "14 00:00:00" or "14 00:00:00, 28 18:00:00".
     */

    // Define the recurrence cycle
    var strRecurrenceCycle = "every-weeks";

    /**
     * Recurrence Cycle Options:
     * - one-time: Task runs once only.
     * - every-minutes: Task runs every minute.
     * - every-hours: Task runs hourly.
     * - every-days: Task runs daily.
     * - every-weeks: Task runs weekly.
     * - every-months: Task runs monthly.
     */

    // Define the start and end dates for the schedule
    var dteStartDate = new Date();
    var dteEndDate = new Date();

    // Define the credentials for scheduling
    var strUserName = "admin";
    var strPassWord = "VMware1!";

    // Schedule the workflow recurrently
    objWorkflow.scheduleRecurrently(
        objProperties,
        strRecurrencePattern,
        strRecurrenceCycle,
        dteStartDate,
        dteEndDate,
        strUserName,
        strPassWord
    );
} catch (objException) {
    // Log any exceptions that occur
    System.error(objException);
}
