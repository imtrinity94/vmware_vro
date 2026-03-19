/**
 * Simple task with custom script capability.
 *
 * @param {string} inputs
 * @param {string} username
 * @param {SecureString} password
 * @return {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} EndpointNew
 * @return {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @return {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,Start:string,Size:string,NetworkProfileId:string,ExternalNetworkProfileId:string,NetworkProfileType:string,BlueprintRequestId:string,NicIndex:number,IsPrimary:boolean):AllocationRequest} AllocationRequestsNew
 * @return {Array/CompositeType(id:string,description:string,ipRangeIds:Array/string,nicIndex:number,isPrimary:boolean,start:string,size:number,properties:Properties):IPAllocationRequest} IPAllocationRequestsNew
 * @return {string} networkProfileType
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
resource_new.Id = resource_data.id; //properties.instanceUUID ? resource_data.id + "-1" : resource_data.id ;
resource_new.Name = resource_data.name; //properties.instanceUUID ? resource_data.name + "-1" : resource_data.name;
resource_new.Description = resource_data.description
resource_new.Type = resource_data.type
resource_new.TenantName = resource_data.properties.__endpointLink;
resource_new.Properties = resource_data.properties

System.log(resource_new.TenantName);
System.log("---------------")
System.log(resource_data.properties.NetworkProfileType)
System.log("This is the properties of the resource")
System.log(resource_new.Id)
System.log(JSON.stringify(resource_data.properties))
ResourceNew = resource_new
System.log("Resource data prepared successfully")


System.log("----------------")
System.log("AllocationRequests data preparing")
var allocation_request_data = data.ipAllocations
System.log(JSON.stringify(data.ipAllocations))
var allocation_request_list = []

for (var i = 0; i < allocation_request_data.length; i++) {
    var each_data = allocation_request_data[i]
    System.log(JSON.stringify(each_data));
    var allocate_each_data = new Object();
    allocate_each_data.Id = each_data.id;
    allocate_each_data.Description = each_data.description
    allocate_each_data.IPRangeIds = each_data.ipRangeIds;
    allocate_each_data.NicIndex = each_data.nicIndex;
    allocate_each_data.IsPrimary = each_data.isPrimary;
    allocate_each_data.Size = each_data.size;
    allocate_each_data.Properties = each_data.properties
    allocation_request_list.push(allocate_each_data)
}

IPAllocationRequestsNew = allocation_request_list
networkProfileType = resource_data.properties.NetworkProfileType
System.log("AllocationRequest data prepared successfully")
System.log("---------------------")