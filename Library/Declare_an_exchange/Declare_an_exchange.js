/**
 * Declare an exchange
 *
 * @param {AMQP:Broker} broker
 * @param {string} name
 * @param {string} type
 * @param {boolean} durable
 * @param {boolean} autoDelete
 */
broker.declareExchange(name, {
 type: type,
 durable: durable,
 autoDelete: autoDelete
});