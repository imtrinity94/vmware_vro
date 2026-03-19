/**
 * Message processing and cleanup
 *
 * @param {AMQP:Broker} broker
 * @param {string} exchangeName
 * @param {Trigger} messageTrigger
 * @param {string} routingKey
 */
System.log("Trigger: " + messageTrigger);
//System.log("Trigger properties: " + messageTrigger.getProperties());

var msg = broker.retrieveMessage(messageTrigger);

//use msg 
broker.deleteExchange(exchangeName);
