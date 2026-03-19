/**
 * Parse vCAC StaticIPv4Addresses
 *
 * @param {vCAC:Entity} vcacEntity
 * @param {vCAC:VCACHost} host
 * @return {string} ipAddress
 * @return {string} subnetMask
 * @return {string} gateway
 */
System.debug("BEGIN: Extract the Network information from the vCAC Entity");
var ipAddress = vcacEntity.getProperty("IPv4Address");

var StaticIPv4NetworkProfiles = vcacEntity.getLink(host, "StaticIPv4NetworkProfile");
var StaticIPv4NetworkProfile = StaticIPv4NetworkProfiles[0];
System.debug(StaticIPv4NetworkProfile);

var subnetMask = StaticIPv4NetworkProfile.getProperty("SubnetMaskIPv4");
System.debug("Found the Subnet Mask information: " + subnetMask);

var gateway = StaticIPv4NetworkProfile.getProperty("GatewayIPv4Address");
System.debug("Found the Gateway information: " + gateway);
System.debug("END: Extract the Network information from the vCAC Entity");