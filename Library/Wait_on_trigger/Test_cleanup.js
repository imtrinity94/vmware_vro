/**
 * Test cleanup
 *
 * @param {AMQP:Broker} broker
 * @param {string} queueName
 * @param {string} exchangeName
 */
broker.deleteExchange(exchangeName);
broker.deleteQueue(queueName);
