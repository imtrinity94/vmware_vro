/**
 * Return the vRealize IaaS Network Profile Entity based on the Network Profile Name selected
 *
 * @param {string} networkProfileName
 * @param {vCAC:VCACHost} host
 * @return {vCAC:Entity} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.vmware.vcac").findStaticIPv4NetworkProfile_byName(host, networkProfileName) ;