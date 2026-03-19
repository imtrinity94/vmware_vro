/**
 * Set Wait Timer
 *
 * @param {number} waitCounter
 * @return {Date} timerDate
 * @return {number} waitCounter
 */
timerDate = new Date();
timerDate.setTime( timerDate.getTime() + 60000 );
waitCounter = waitCounter + 1;
System.log( "Current Counter - " + waitCounter + ":  Pausing for one minute to retry." );