/**
 * Simple task with custom script capability.
 *
 * @param {VRA:CloudAccountVsphere} account
 */
var host = account.host;
if(host == null){
    System.error("Host is missing for account "+account.name);
    throw new Error("Host is missing for account "+account.name);
}
else{
    var cloudAccountServiceClient = host.createInfrastructureClient().createCloudAccountService();
    cloudAccountServiceClient.deleteVSphereCloudAccount(account);
    System.log("vSphere Cloud account "+account.name+" deleted successfully!");
}