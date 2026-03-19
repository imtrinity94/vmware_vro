/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Zone} zone
 */
var host = zone.host;
if(host == null){
    System.error("Host is missing for zone "+zone.name);
    throw new Error("Host is missing for zone "+zone.name);
}
else{
    var iaasClient = host.createInfrastructureClient();
    var cloudZoneService = iaasClient.createCloudZoneService();
    cloudZoneService.deleteZone(zone);
    System.log("Cloud Zone "+zone.name+" deleted successfully!");
}


