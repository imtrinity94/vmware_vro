/**
 * Get key
 *
 * @param {Any} sourceVirtualEthernetCard
 * @param {Any} network
 * @return {number} key
 * @return {string} deviceName
 */
key = sourceVirtualEthernetCard.key;
if (network == null) throw "Reference Error: network cannot be null";
deviceName = network.name;