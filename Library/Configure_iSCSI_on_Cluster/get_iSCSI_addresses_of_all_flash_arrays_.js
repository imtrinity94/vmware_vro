/**
 * get iSCSI addresses of all flash arrays
 *
 * @param {Array/PS:FlashArrayConnection} faConnections
 * @return {Array/string} iSCSIAddresses
 * @return {Array} iSCSItargets
 * @return {Array} targetNames1
 */
iSCSIAddresses=new Array();
var targetNames=new Array();

for each(faConnection in faConnections){
	var myPSPort = new PSPort() ;
	var connectionPorts=myPSPort.getConnectionPorts(faConnection);
	var addresses=PSFlashArrayManager.getFlashArrayNetwork(faConnection);
	for each(address in addresses){
		if(address!=null){
			System.log("iSCSI target:" +address);
			for each(connectionPort in connectionPorts){
				if(connectionPort.portal != null){
					if(connectionPort.portal.indexOf(address)>-1){
						var tagetName=connectionPort.iqn;
						System.log("Corrosponding target name:"+tagetName);
						targetNames.push(tagetName);
						continue;
					}
				}
			}
		iSCSIAddresses.push(address);
		}
	}
}
iSCSItargets=iSCSIAddresses;
targetNames1=targetNames;
System.log("Number of iSCSI targets found: "+iSCSItargets.length);