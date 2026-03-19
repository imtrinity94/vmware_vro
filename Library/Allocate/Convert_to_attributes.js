/**
 * Convert to attributes
 *
 * @param {CompositeType(id:string,description:string,ipRangeIds:Array/string,nicIndex:number,isPrimary:boolean,start:string,size:number,properties:Properties):IPAllocationRequest} attrCurrentRequest
 * @param {string} networkProfileType
 * @return {string} attrRequestId
 * @return {Array/string} attrIpRanges
 * @return {number} attrBlockSize
 * @return {number} attrVnicIndex
 * @return {string} attrBpRequestId
 * @return {boolean} attrIsPrimary
 * @return {string} attrNetworkProfileId
 * @return {string} attrExternalNetworkProfileId
 * @return {string} attrNetworkProfileType
 */
attrRequestId = attrCurrentRequest.Id;
attrIpRanges = attrCurrentRequest.IPRangeIds;
attrBlockSize = parseInt(attrCurrentRequest.Size);
attrVnicIndex = attrCurrentRequest.NicIndex;
attrIsPrimary = attrCurrentRequest.IsPrimary;
attrNetworkProfileType = networkProfileType;

if (isNaN(attrBlockSize)) {
	attrBlockSize = 1;
	System.log("Number of IP addresses to allocate is undefined, setting to " + attrBlockSize);
}
