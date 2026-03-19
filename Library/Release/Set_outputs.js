/**
 * Set outputs
 *
 * @param {Array/CompositeType(ReleaseRequestId:string,Status:string,ErrorCode:string,ErrorMessage:string):ReleaseResult} attrReleaseResults
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,NicIndex:string,IPAddresses:Array/string):ReleaseRequestNew} ReleaseRequestNew
 * @return {string} outputs
 */
//ReleaseResultsNew = attrReleaseResults;
System.log(attrReleaseResults)

data = [];
for(var i = 0; i < ReleaseRequestNew.length; i++){
    var dict_data = {
        "ipDeallocationId" : ReleaseRequestNew[i].Id,
        "Deallocated Ip" : ReleaseRequestNew[i].IPAddresses,
        "message" : "IP Deallocation Successfull" 
    }
    data.push(dict_data)
}
const x = {ipDeallocations: data}
outputs = JSON.stringify(x);