/**
 * Add a broker
 *
 * @param {string} host
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {string} virtualHost
 * @param {string} name
 * @param {boolean} useSSL
 * @param {boolean} acceptAllCertificates
 * @return {AMQP:Broker} broker
 */
broker = AMQPBrokerManager.addBroker({
	host: host,
	port: port,
	username: username,
	password: password,
	virtualHost: virtualHost,
	useSSL: useSSL,
	acceptAllCertificates: acceptAllCertificates,
	name: name,	
});