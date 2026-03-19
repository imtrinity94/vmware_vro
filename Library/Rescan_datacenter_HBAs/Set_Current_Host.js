/**
 * Set Current Host
 *
 * @param {Array/VC:HostSystem} allHosts
 * @param {number} hostCount
 * @return {VC:HostSystem} currentHost
 */
var currentHost = allHosts[hostCount -1];
System.log("Rescanning HBAs on : "+currentHost.name);