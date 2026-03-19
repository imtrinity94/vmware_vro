/**
 * Prepare the test
 *
 * @param {AMQP:Broker} broker
 * @param {string} exchangeName
 * @param {string} routingKey
 * @return {Trigger} messageTrigger
 */
if ( broker != null ) {
	broker.declareExchange(exchangeName, {type: "fanout"});
	messageTrigger = broker.declareQueueAndReceiveAsync(exchangeName, routingKey, 0);
} else {
	throw "Broker is null!";
}