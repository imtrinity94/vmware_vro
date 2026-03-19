/**
 * Restarts the NIOS services to make sure IPAM changes take into effect
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {InfobloxIPAM:IpamRestartMemberOrder} memberOrder - [object Object]
 * @param {InfobloxIPAM:IpamRestartRequestType} requestType - [object Object]
 * @param {InfobloxIPAM:IpamRestartServiceOption} serviceOption - [object Object]
 * @param {number} sequentialDelay - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").restartIpamServices(ipamConnection,memberOrder,requestType,serviceOption,sequentialDelay) ;