/**
 * Get all QoS rules
 *
 * @param {StoreServ:Connection} connection
 * @return {string} qosList
 */
qosList = connection.listAllQoS();
if(qosList){

	System.log("Total QoS rules found: " + qosList.length);
}

System.debug("Returned list of QoS rules : " + qosList);
