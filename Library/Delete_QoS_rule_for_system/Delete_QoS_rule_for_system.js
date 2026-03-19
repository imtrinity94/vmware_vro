/**
 * Delete QoS rule for system
 *
 * @param {StoreServ:Connection} connection
 * @return {boolean} isSuccess
 */
isSuccess = connection.deleteQoSRuleforsys();

if(isSuccess) {
	
	System.log("QoS rule for system removed successfully!");

}