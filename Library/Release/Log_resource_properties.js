/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,NicIndex:string,IPAddresses:Array/string):ReleaseRequestNew} ReleaseRequestNew
 * @return {string} attrIPbyNIC
 */
var text = "vRA resource: ";
text += "\n\tId: " + ResourceNew.Id;
text += "\n\tName: " + ResourceNew.Name;
text += "\n\tDescription: " + ResourceNew.Description;
text += "\n\tType: " + ResourceNew.Type;
text += "\n\tTenantId: " + ResourceNew.TenantId;
text += "\n\tTenantName: " + ResourceNew.TenantName;

System.log(text);

text += "\n\tattrIPbyNIC: " + ReleaseRequestNew[0].IPAddress;
System.log(ReleaseRequestNew[0].IPAddress)
attrIPbyNIC = ReleaseRequestNew[0].IPAddress
/*System.log(ReleaseRequestNew[0].NicIndex);
NicIP=ReleaseRequestNew[0].NicIndex.toString();
searchString = "VirtualMachine.Network";
searchString += NicIP;
searchString += ".Address";
//VirtualMachine.Network0.Address
System.log(searchString)
text = "vRA resource properties:";

var array = new Array();

for each (var key in ResourceNew.Properties.keys) {
	if (key == "VirtualMachine.Password")
		continue;
	if (key == searchString)
		attrIPbyNIC = ResourceNew.Properties.get(key);
	array.push(key + ": " + ResourceNew.Properties.get(key));	
}

array.sort();

for each (var line in array) {
	text += "\n\t" + line;
}
*/
System.log(text);
