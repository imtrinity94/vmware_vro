/**
 * Validate a broker connection
 *
 * @param {AMQP:Broker} broker
 */
if (!broker != null) {
	broker.validate();
} else {
	throw "Could not validate null broker.";
}