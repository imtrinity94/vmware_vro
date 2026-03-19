/**
 * Scriptable task
 *
 * @param {AWS:EC2VpnConnection} vpnConnection - [object Object]
 */
//Get the AmazonEC2Client
var client = vpnConnection.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteVpnConnectionRequest();

//Set the VPN connection id
deleteRequest.setVpnConnectionId(vpnConnection.getVpnConnectionId());

//Send the request
client.deleteVpnConnection(deleteRequest);