/**
 * Set outputs
 *
 * @param {Array/CompositeType(AllocationRequestId:string,IPAddresses:Array/string,RangeId:string,IPVersion:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,DNSSuffix:string,DNSSearchSuffixes:string,PrimaryWINS:string,SecondaryWINS:string):AllocationResult} attrAllocationResults
 * @return {string} outputs
 * @return {Array/CompositeType(AllocationRequestId:string,IPAddresses:Array/string,RangeId:string,IPVersion:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,DNSSuffix:string,DNSSearchSuffixes:string,PrimaryWINS:string,SecondaryWINS:string):AllocationResult} AllocationResultsNew
 */
System.log("--------------")
System.log("attrAllocationResults json")
System.log(JSON.stringify(attrAllocationResults))
System.log("-----------------------")

data = []

for(var i = 0; i < attrAllocationResults.length; i++){
    var dict_data = {
        "ipAllocationId": attrAllocationResults[i].AllocationRequestId,
        "ipAddresses": attrAllocationResults[i].IPAddresses,
        "ipRangeId": attrAllocationResults[i].RangeId,
        "ipVersion": attrAllocationResults[i].IPVersion,
        "gateWayAddress": attrAllocationResults[i].Gateway,
        "subnetPrefixLength": attrAllocationResults[i].SubnetPrefixLength,
        "domain": attrAllocationResults[i].DNSSuffix
        
    }
    data.push(dict_data)
}
const x = {ipAllocations: data}
//AllocationResultsNew = attrAllocationResults;
outputs = JSON.stringify(x)