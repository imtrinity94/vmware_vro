/**
 * Create a subscription
 *
 * @param {AMQP:Broker} broker
 * @param {Array/string} queues
 * @param {string} name
 * @return {AMQP:Subscription} subscription
 */
var props = {name: name};
subscription = broker.subscribe(queues, props);