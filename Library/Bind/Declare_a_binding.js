/**
 * Declare a binding
 *
 * @param {AMQP:Broker} broker
 * @param {string} queueName
 * @param {string} exchangeName
 * @param {string} routingKey
 */
broker.bind(queueName, exchangeName, {
   routingKey: routingKey
});