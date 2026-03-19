/**
 * Delete a binding
 *
 * @param {AMQP:Broker} broker
 * @param {string} queueName
 * @param {string} exchangeName
 * @param {string} routingKey
 */
broker.unbind(queueName, exchangeName, {
   routingKey: routingKey
});