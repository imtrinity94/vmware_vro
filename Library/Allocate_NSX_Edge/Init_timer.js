/**
 * Init timer
 *
 * @param {number} attrWaitingForNsxEdgeInSeconds
 * @return {Date} attrWaitingForNsxEdgeTime
 */
System.log("Initializing timer to wait for NSX Edge allocated event for " + attrWaitingForNsxEdgeInSeconds + " seconds...");
attrWaitingForNsxEdgeTime = new Date(new Date().getTime() + attrWaitingForNsxEdgeInSeconds * 1000);
