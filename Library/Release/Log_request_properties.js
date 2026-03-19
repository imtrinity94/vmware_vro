/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(Id:string,IPAddress:string,IPRangeId:string,Description:string,NetworkProfileId:string,NetworkProfileType:string,NicIndex:number):ReleaseRequest} attrCurrentRequest
 */
var text = "Got next release request:";
text += "\n\tId: " + attrCurrentRequest.Id;
text += "\n\tIPAddress: " + attrCurrentRequest.IPAddress;
text += "\n\tIPRangeId: " + attrCurrentRequest.IPRangeId;
text += "\n\tDescription: " + attrCurrentRequest.Description;
text += "\n\tNetworkProfileID: " + attrCurrentRequest.NetworkProfileID;
text += "\n\tNetworkProfileType: " + attrCurrentRequest.NetworkProfileType;
text += "\n\tNicIndex: " + attrCurrentRequest.NicIndex;

System.log(text);