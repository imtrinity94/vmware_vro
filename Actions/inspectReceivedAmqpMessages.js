/**
 * @description Retrieves and logs the last received AMQP message from a subscription,
 *              including the message body, notification headers, and message properties.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {AMQP:Subscription} amqpSubscription - The AMQP subscription to retrieve the last trigger from.
 * @returns {void}
 */

var triggerProperties = amqpSubscription.retrieveLastOnMessageTrigger();

if (triggerProperties) {
    var body = triggerProperties.get('body');
    System.log("AMQP Message Body: " + body);

    var notificationHeaders = triggerProperties.get('headers');
    if (notificationHeaders) {
        System.log("Notification Headers:");
        System.log("  type: " + notificationHeaders.get("notification.type"));
        System.log("  orgUUID: " + notificationHeaders.get("notification.orgUUID"));
        System.log("  entityType: " + notificationHeaders.get("notification.entityType"));
        System.log("  entityUUID: " + notificationHeaders.get("notification.entityUUID"));
        System.log("  userUUID: " + notificationHeaders.get("notification.userUUID"));
        System.log("  operationSuccess: " + notificationHeaders.get("notification.operationSuccess"));
    }

    var amqpProperties = triggerProperties.get('properties');
    if (amqpProperties) {
        System.log("AMQP Properties:");
        System.log("  receivedRoutingKey: " + amqpProperties.get("receivedRoutingKey"));
        System.log("  messageCount: " + amqpProperties.get("messageCount"));
        System.log("  deliveryMode: " + amqpProperties.get("deliveryMode"));
        System.log("  priority: " + amqpProperties.get("priority"));
        System.log("  deliveryTag: " + amqpProperties.get("deliveryTag"));
        System.log("  contentType: " + amqpProperties.get("contentType"));
        System.log("  contentEncoding: " + amqpProperties.get("contentEncoding"));
        System.log("  receivedExchange: " + amqpProperties.get("receivedExchange"));
        System.log("  contentLength: " + amqpProperties.get("contentLength"));
    }
} else {
    System.warn("No AMQP message triggers found for the subscription.");
}

return null;
