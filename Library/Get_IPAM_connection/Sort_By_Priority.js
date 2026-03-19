/**
 * Sort By Priority
 *
 * @param {Array/InfobloxIPAM:IpamConnection} ipamConnections
 * @return {Array/InfobloxIPAM:IpamConnection} ipamConnections
 */
ipamConnections = ipamConnections.sort(compareByPriority);

function compareByPriority(a, b) {
  return a.connectionPriority - b.connectionPriority;
}
