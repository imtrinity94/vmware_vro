/**
 * Delete QoS Rule for   vvSet
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:VVSet} qosvvsetName
 * @return {boolean} isSuccess
 */
isSuccess = connection.deleteQoSRuleforVVSet(qosvvsetName);


if(isSuccess) {	
	System.log("QoS rule for Virtual Volume Set \""+ qosvvsetName.name +"\" removed successfully!");
}