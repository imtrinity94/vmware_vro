/**
 * Determine vRealize Reservation
 *
 * @param {vCACCAFE:VCACHost} host
 * @param {vCACCAFE:CompositeBlueprint} blueprint
 * @param {string} blueprintComponent
 * @param {vCACCAFE:Reservation} reservation
 * @return {vCACCAFE:Reservation} vraReservation
 */
if (reservation){
  	vraReservation = reservation
} else {
	vraReservation = System.getModule("com.cohesity.plugin.vmware.vcaccafe").getReservationDetailsByBlueprintComponent(host, blueprint, blueprintComponent) ;
}