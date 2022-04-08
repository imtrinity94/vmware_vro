var objAMQPBroker;
objAMQPBroker = AMQPBrokerManager.addBroker({
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

var objAMQPSubscription;
objAMQPSubscription = objAMQPBroker.subscribe(["vCloudNotifications"], {
    name: "vCloudSubscription"
});
