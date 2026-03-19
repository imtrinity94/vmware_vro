/**
 * @description Creates an AMQP broker connection, declares an exchange and a queue,
 *              binds them with a wildcard routing key, and subscribes to the queue.
 *              Intended as a sample for setting up vCloud event notifications via RabbitMQ.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

var objAMQPBroker = AMQPBrokerManager.addBroker({
    host: "cloudblogger-amqp.domain.local",
    port: 5672,
    username: "username",
    password: "pa$$w0rd",
    virtualHost: "/",
    useSSL: false,
    acceptAllCertificates: true,
    name: "RabbitMQ"
});
objAMQPBroker.validate();
objAMQPBroker.declareExchange("vCloudExchange", {
    type: "topic",
    durable: true,
    autoDelete: false
});
objAMQPBroker.declareQueue("vCloudNotifications", {
    durable: true,
    exclusive: false,
    autoDelete: false
});
objAMQPBroker.bind("vCloudNotifications", "vCloudExchange", {
    routingKey: "#"
});

var objAMQPSubscription = objAMQPBroker.subscribe(["vCloudNotifications"], {
    name: "vCloudSubscription"
});
