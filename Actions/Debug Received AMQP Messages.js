var objProperties;
	objProperties = objSubscription.retrieveLastOnMessageTrigger();

var strMessageBody;
	strMessageBody = objProperties.get('body');

System.log("Message Body: " + strMessageBody);

var objHeaders;
	objHeaders = objProperties.get('headers');

System.log("notification.type : " + objHeaders.get("notification.type"));
System.log("notification.orgUUID : " + objHeaders.get("notification.orgUUID"));
System.log("notification.entityType : " + objHeaders.get("notification.entityType"));
System.log("notification.entityUUID : " + objHeaders.get("notification.entityUUID"));
System.log("notification.userUUID : " + objHeaders.get("notification.userUUID"));
System.log("notification.operationSuccess : " + objHeaders.get("notification.operationSuccess"));

var objProperties2;
	objProperties2 = objProperties.get('properties');

System.log("receivedRoutingKey : " + objProperties2.get("receivedRoutingKey"));
System.log("messageCount : " + objProperties2.get("messageCount"));
System.log("deliveryMode : " + objProperties2.get("deliveryMode"));
System.log("priority : " + objProperties2.get("priority"));
System.log("deliveryTag : " + objProperties2.get("deliveryTag"));
System.log("contentType : " + objProperties2.get("contentType"));
System.log("contentEncoding : " + objProperties2.get("contentEncoding"));
System.log("receivedExchange : " + objProperties2.get("receivedExchange"));
System.log("contentLength : " + objProperties2.get("contentLength"));
