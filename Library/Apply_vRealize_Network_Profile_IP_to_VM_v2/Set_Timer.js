/**
 * Set Timer
 *
 * @return {Date} timerDate
 */
timerDate = new Date();
timerDate.setTime( timerDate.getTime() + 60000 );
System.debug( "Waiting for Guest Customization to complete.  Pausing for one minute to retry." );