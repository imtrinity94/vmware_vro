/**
 * Demonstrats AMQP plug-in usage of triggers.
 *
 * @param {AMQP:Broker} broker
 * @param {string} queueName
 * @param {string} exchangeName
 * @param {string} routingKey
 */
if ( broker != null ) {
	broker.declareExchange(exchangeName, {type: "direct"});
	broker.declareQueue(queueName, null);
	broker.bind(queueName, exchangeName, {routingKey: routingKey});
} else {
	throw "Broker is null!";
}