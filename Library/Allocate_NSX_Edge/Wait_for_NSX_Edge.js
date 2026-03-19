/**
 * Wait for custom event
 *
 * @param {Date} endDate - [object Object]
 * @param {string} eventName - [object Object]
 * @param {boolean} isExternalEvent - [object Object]
 * @return {boolean} success - [object Object]
 */
//Auto-generated script
var eventType = isExternalEvent ? 'external' : 'internal';
var eventCustom = null;
if (eventName != null) {
	eventCustom = System.waitCustomEventUntil(eventType,eventName,endDate);
}
success = (eventCustom != null) ;