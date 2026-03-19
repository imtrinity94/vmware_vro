/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(Id:string,RangeId:string):DeleteIPRangeRequest} attrCurrentRequest - [object Object]
 */
var text = "Got next delete IP Range request:";
text += "\n\tId: " + attrCurrentRequest.Id;
text += "\n\tRangeId: " + attrCurrentRequest.RangeId;
System.log(text);
