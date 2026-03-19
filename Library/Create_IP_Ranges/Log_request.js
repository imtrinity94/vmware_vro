/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(Id:string,IPBlockIds:Array/string,AddressSpaceId:string,Start:string,End:string,AssignmentType:string,IPVersion:string,SubnetPrefixLength:number,Gateway:string,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExternalNetworkProfileId:string,NetworkProfileId:string,BlueprintRequestId:string):CreateIPRangeRequest} attrCurrentRequest
 */
var text = "Got next Create IP Range request:";
text += "\n\tId: " + attrCurrentRequest.Id;
text += "\n\tIPBlockIds: " + attrCurrentRequest.IPBlockIds;
text += "\n\tAddressSpaceId: " + attrCurrentRequest.AddressSpaceId;
text += "\n\tStart: " + attrCurrentRequest.Start;
text += "\n\tEnd: " + attrCurrentRequest.End;
text += "\n\tAssignmentType: " + attrCurrentRequest.AssignmentType;
text += "\n\tIPVersion: " + attrCurrentRequest.IPVersion;
text += "\n\tSubnetPrefixLength: " + attrCurrentRequest.SubnetPrefixLength;

text += "\n\tGateway: " + attrCurrentRequest.Gateway;
text += "\n\tPrimaryDNS: " + attrCurrentRequest.PrimaryDNS;
text += "\n\tSecondaryDNS: " + attrCurrentRequest.SecondaryDNS;
text += "\n\tPrimaryWINS: " + attrCurrentRequest.PrimaryWINS;
text += "\n\tSecondaryWINS: " + attrCurrentRequest.SecondaryWINS;
text += "\n\tDNSSuffix: " + attrCurrentRequest.DNSSuffix;
text += "\n\tDNSSearchSuffixes: " + attrCurrentRequest.DNSSearchSuffixes;

text += "\n\tNetworkProfileId: " + attrCurrentRequest.NetworkProfileId;
text += "\n\tExternalNetworkProfileId: " + attrCurrentRequest.ExternalNetworkProfileId;
text += "\n\tBlueprintRequestId: " + attrCurrentRequest.BlueprintRequestId;

System.log(text);
