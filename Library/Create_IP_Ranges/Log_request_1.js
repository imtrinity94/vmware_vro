/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(Id:string,IPBlockIds:Array/string,AddressSpaceId:string,Start:string,End:string,AssignmentType:string,IPVersion:string,SubnetPrefixLength:number,Gateway:string,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExternalNetworkProfileId:string,NetworkProfileId:string,BlueprintRequestId:string):CreateIPRangeRequest} attrCurrentRequest
 */
var text = "Got next Create IP Range request:";
text += "\n\tId: " + attrCurrentRequest.Id;
text += "\n\tIPBlockIds: " + attrCurrentRequest.IPBlockIds;
text += "\n\tBlueprintRequestId: " + attrCurrentRequest.BlueprintRequestId;
text += "\n\tNetworkProfileId: " + attrCurrentRequest.NetworkProfileId;
text += "\n\tExternalNetworkProfileId: " + attrCurrentRequest.ExternalNetworkProfileId;

System.log(text);
