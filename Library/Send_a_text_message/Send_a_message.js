/**
 * Send a message
 *
 * @param {AMQP:Broker} broker
 * @param {string} routingKey
 * @param {string} exchange
 * @param {string} text
 */
var msg = new AMQPMessage();
msg.bodyAsText = text;
broker.send(exchange, routingKey, msg);