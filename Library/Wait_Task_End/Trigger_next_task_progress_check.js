/**
 * Trigger next task progress check
 *
 * @param {number} pollInterval
 * @return {Date} timerTick
 */
timerTick = new Date();
timerTick.setTime(timerTick.getTime() + pollInterval);