/**
 * @description Creates an AMQP broker connection, declares an exchange and a queue,
 *              binds them with a wildcard routing key, and subscribes to the queue.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @returns {void}
 */

var amqpBroker = AMQPBrokerManager.addBroker({
    host: "cloudblogger-amqp.domain.local",
    port: 5672,
    username: "username",
    password: "pa$$w0rd",
    virtualHost: "/",
    useSSL: false,
    acceptAllCertificates: true,
    name: "RabbitMQ"
});

amqpBroker.validate();

amqpBroker.declareExchange("vCloudExchange", {
    type: "topic",
    durable: true,
    autoDelete: false
});

amqpBroker.declareQueue("vCloudNotifications", {
    durable: true,
    exclusive: false,
    autoDelete: false
});

amqpBroker.bind("vCloudNotifications", "vCloudExchange", {
    routingKey: "#"
});

var amqpSubscription = amqpBroker.subscribe(["vCloudNotifications"], {
    name: "vCloudSubscription"
});

System.log("AMQP broker and subscription initialized.");

return null;
