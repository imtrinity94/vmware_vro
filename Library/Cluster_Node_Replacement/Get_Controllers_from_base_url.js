/**
 * Get Controllers from base url
 *
 * @param {string} controller1
 * @return {string} host1
 * @return {string} host1_cert
 */
// Validate Controller 1 input
var flag=(controller1.indexOf('https') == 0);
if(flag){

	host1 = controller1;
    host1_cert = (controller1+"/api/initial-data");

}else{
	host1=("https://"+controller1);
    host1_cert = ("https://"+controller1+"/api/initial-data");
}

System.log("Waiting 10 Minutes for the Controller's to come online");
System.sleep(600000); // Wait for configuration to kick in