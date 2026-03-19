/**
 * Return a newly created StaticIPv4Address Entity based on the supplied IP Address and StaticIPv4Range
 *
 * @param {string} ip_address - [object Object]
 * @param {vCAC:Entity} staticIPv4Range - [object Object]
 * @param {vCAC:VCACHost} host
 * @return {vCAC:Entity} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.vmware.vcac").createStaticIPv4AddressEntity(host,ip_address,staticIPv4Range) ;