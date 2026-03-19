/**
 * Simple task with custom script capability.
 *
 * @param {string} inputs
 * @param {string} username
 * @param {SecureString} password
 * @return {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} EndpointNew
 * @return {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @return {string} networkProfileType
 * @return {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,NicIndex:string,IPAddresses:Array/string):ReleaseRequestNew} ReleaseRequestNew
 */
const data = JSON.parse(inputs)
System.log("Preparing Endpoint data")
System.log(JSON.stringify(data))
System.log("--------------------")

var endpoint_new = new Object();
endpoint_new.Id = data.endpoint.id
endpoint_new.URL = data.endpoint.endpointProperties.hostName
endpoint_new.Username = username
endpoint_new.Password = password
endpoint_new.Properties = JSON.parse(data.endpoint.endpointProperties.properties)

EndpointNew = endpoint_new
System.log("EndpointNew data prepared successfully")
System.log("-----------------------")

System.log("Resource Data preparing")
var resource_data = data.resourceInfo
var resource_new = new Object();
resource_new.Id = resource_data.id
resource_new.Name = resource_data.name
resource_new.Description = resource_data.description
resource_new.Type = resource_data.type
resource_new.Properties = resource_data.properties

ResourceNew = resource_new
System.log("Resource data prepared successfully")
System.log("----------------")

System.log("Release Request Data preparing")
var release_request_data = data.ipDeallocations

var release_request_list = []
for (var i = 0; i < release_request_data.length; i++) {
    var each_data = release_request_data[i]
    System.log(JSON.stringify(each_data));
    var release_each_data = new Object();
    release_each_data.Id = each_data.id;
    release_each_data.Description = each_data.description
    release_each_data.IPRangeId = each_data.ipRangeId;
    release_each_data.IPAddress = each_data.ipAddress;
    release_each_data.AddressSpaceId = each_data.addressSpaceId;
    release_request_list.push(release_each_data)
}
ReleaseRequestNew = release_request_list
networkProfileType = resource_data.properties.NetworkProfileType
System.log(networkProfileType)
System.log("ReleaseRequest data prepared successfully")
System.log("---------------------")