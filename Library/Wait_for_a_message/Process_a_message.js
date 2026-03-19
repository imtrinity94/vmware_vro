/**
 * Process a message
 *
 * @param {Trigger} messageTrigger
 * @param {AMQP:Broker} broker
 * @return {string} body
 * @return {Properties} headers
 * @return {Properties} properties
 */
System.log("Trigger: " + messageTrigger);
//System.log("Trigger properties: " + messageTrigger.getProperties());
var msg = broker.retrieveMessage(messageTrigger);

if (msg != null) {
  body = msg.bodyAsText
  properties = msg.properties;
  headers = msg.headers;
}