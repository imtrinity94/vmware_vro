/**
 * Convert to attributes
 *
 * @param {CompositeType(Id:string,IPAddress:string,IPRangeId:string,Description:string,NetworkProfileId:string,NetworkProfileType:string,NicIndex:number):ReleaseRequest} attrCurrentRequest
 * @param {string} attrIPbyNIC
 * @param {string} networkProfileType
 * @return {string} attrRequestId
 * @return {string} attrIpAddress
 * @return {string} attrIpRangeId
 * @return {number} attrVnicIndex
 * @return {string} attrNetworkProfileType - [object Object]
 * @return {string} networkview
 */
attrRequestId = attrCurrentRequest.Id;
attrIpAddress = attrCurrentRequest.IPAddress;
attrIpRangeId = attrCurrentRequest.IPRangeId;
data = attrIpRangeId.split("/");
networkview = data[1];
attrNetworkProfileType = networkProfileType;
attrVnicIndex = attrCurrentRequest.NicIndex;

if(attrIpAddress == undefined)
{
	attrIpAddress = attrIPbyNIC;
}

System.log(attrIpAddress)