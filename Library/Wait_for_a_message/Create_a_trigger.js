/**
 * Create a trigger
 *
 * @param {AMQP:Broker} broker
 * @param {string} queue
 * @return {Trigger} messageTrigger
 */
messageTrigger = broker.receiveAsync(queue, 0);