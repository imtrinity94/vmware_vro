/**
 * Simple task with custom script capability.
 *
 * @param {string} inputs
 * @param {string} username
 * @param {SecureString} password
 * @return {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} EndpointNew
 */
const data = JSON.parse(inputs)
System.log("Preparing Endpoint data")

var endpoint_new = new Object();
endpoint_new.Id = data.endpoint.id
endpoint_new.URL = data.endpoint.endpointProperties.hostName
endpoint_new.Username = username
endpoint_new.Password = password
endpoint_new.Properties = JSON.parse(data.endpoint.endpointProperties.properties)


EndpointNew = endpoint_new

System.log(EndpointNew)