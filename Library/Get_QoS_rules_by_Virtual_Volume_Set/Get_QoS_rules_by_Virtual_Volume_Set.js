/**
 * Get QoS rules by Virtual Volume Set
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:VVSet} volSetName
 * @return {string} qosRule
 */
qosRule = connection.listVVSetQoS(volSetName);

if(qosRule != undefined) {
	
	System.log("Retrieved the details of QoS rule for Virtual Volume Set \"" + volSetName.name + "\" successfully!");
	System.debug("Retured QoS rule : " + qosRule);

}
