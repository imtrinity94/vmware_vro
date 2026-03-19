/**
 * Return an available selected vRealize Infrastructure StaticIPv4Addresses Entity
 *
 * @param {vCAC:Entity} entity
 * @param {vCAC:VCACHost} host
 * @param {string} ipaddress
 * @return {vCAC:Entity} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.vmware.vcac").findAvailableIpv4AddressFromNetworkProfile(host, entity, ipaddress) ;