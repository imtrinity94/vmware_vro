/**
 * Update a broker
 *
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {string} virtualHost
 * @param {AMQP:Broker} broker
 * @param {string} host
 * @param {string} name
 * @param {boolean} useSSL
 * @param {boolean} acceptAllCertificates
 * @return {AMQP:Broker} updatedBroker
 */
updatedBroker = broker.update({
	host: host,
	port: port,
	username: username,
	password: password,
	virtualHost: virtualHost,
	useSSL: useSSL,
	acceptAllCertificates: acceptAllCertificates,	
	name: name
});