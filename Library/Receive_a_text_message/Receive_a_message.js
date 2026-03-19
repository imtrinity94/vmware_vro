/**
 * Receive a message
 *
 * @param {AMQP:Broker} broker
 * @param {string} queue
 * @return {string} body
 * @return {Properties} headers
 * @return {Properties} properties
 */
var msg = broker.receive(queue);

if (msg != null) {
  body = msg.bodyAsText;
  headers = msg.headers;
  properties = msg.properties;
}