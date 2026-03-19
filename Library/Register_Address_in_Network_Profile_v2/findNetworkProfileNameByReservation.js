/**
 * Return the Network Profile Name associated with the vRealize Reservation supplied.
 *
 * @param {vCACCAFE:VCACHost} host
 * @param {vCACCAFE:Reservation} reservation
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.vmware.vcaccafe").findNetworkProfileNameByReservation(host, reservation) ;