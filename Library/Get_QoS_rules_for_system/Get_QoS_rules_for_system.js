/**
 * Get QoS rules for system
 *
 * @param {StoreServ:Connection} connection
 * @return {string} sysQos
 */
sysQos = connection.listSystemQoS();

if(sysQos != undefined) {
	
	System.log("Retrieved the details of QoS rule for successfully!");
	System.debug("Retured QoS rule : " + sysQos);

}
