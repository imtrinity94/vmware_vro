/**
 * Declare a queue
 *
 * @param {AMQP:Broker} broker
 * @param {string} name
 * @param {boolean} durable
 * @param {boolean} exclusive
 * @param {boolean} autoDelete
 */
broker.declareQueue(name, {
  durable: durable,
  exclusive: exclusive,
  autoDelete: autoDelete
});