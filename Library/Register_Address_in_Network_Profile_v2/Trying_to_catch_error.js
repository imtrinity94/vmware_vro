/**
 * Trying to catch error
 *
 * @param {string} waitCounter
 * @return {string} waitCounter
 */
System.debug("Trying to recover from an error finding the NetworkProfileName");
timerDate = new Date();
timerDate.setTime( timerDate.getTime() + 10000 );
System.waitUntil(timerDate);
waitCounter++;
System.debug("Attempt Number: " + waitCounter);