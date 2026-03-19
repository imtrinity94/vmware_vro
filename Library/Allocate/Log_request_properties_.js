/**
 * Simple task with custom script capability.
 *
 * @param {CompositeType(id:string,description:string,ipRangeIds:Array/string,nicIndex:number,isPrimary:boolean,start:string,size:number,properties:Properties):IPAllocationRequest} attrCurrentRequest
 * @param {boolean} attrReconfigure
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @param {string} networkProfileType
 * @return {string} attReconfNetworkView
 * @return {string} attrIPAddressReconf
 * @return {boolean} attrReconfigure
 * @return {string} attrReconfigureMAC
 */
var text = "Got next allocation request:";
text += "\n\tId: " + attrCurrentRequest.Id;
text += "\n\tAddressSpaceId: " + attrCurrentRequest.AddressSpaceId;
text += "\n\tIPRangeIds: " + attrCurrentRequest.IPRangeIds;
text += "\n\tDescription: " + attrCurrentRequest.Description;
text += "\n\tSize: " + attrCurrentRequest.Size;
text += "\n\tNicIndex: " + attrCurrentRequest.NicIndex;
text += "\n\tIsPrimary: " + attrCurrentRequest.IsPrimary;
text += "\n\tNetworkProfileType: " + networkProfileType;


System.log(text);
text = "vRA resource properties data check:";

var array = new Array();
var str = "__VirtualMachine.Network"+attrCurrentRequest.NicIndex+".Address.IPAM.External.Network.Profile";
var RangeID = "__VirtualMachine.Network"+attrCurrentRequest.NicIndex+".Address.IPAM.External.RangeId";
var address = "VirtualMachine.Network"+attrCurrentRequest.NicIndex+".Address";
var MAC_address = "VirtualMachine.Network"+attrCurrentRequest.NicIndex+".MacAddress"; 

if (ResourceNew.Properties != null && ResourceNew.Properties.keys != null) {
	for each (var key in ResourceNew.Properties.keys) {
		
		if (key == str) {
			var data = ResourceNew.Properties[key];
			
			
			if (data != attrCurrentRequest.NetworkProfileId){
				attrReconfigure = true;
				System.log("Reconfigure on PortGroup : True");
			}
		}
		if (key == RangeID)	{
			var temp = ResourceNew.Properties[key];
			temp = temp.split("/");
			attNetworkView = temp[1];
			//System.log(attNetworkView);
		}
		if (key == address)	{
			var temp = ResourceNew.Properties[key];
			attrIPAddress = temp;
			//System.log(attrIPAddress);
		}
		if (key == MAC_address)	{
			var temp = ResourceNew.Properties[key];
			attrReconfigureMAC = temp;
			//System.log(attrReconfigureMAC);
		}	

}
//System.log(attrReconfigure);
}
