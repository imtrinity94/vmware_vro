/**
 * Get Device[]
 *
 * @param {Any} virtualEthernetCard
 * @return {Array/Any} deviceChange
 */
var deviceChange = new Array();
var change = new VcVirtualDeviceConfigSpec();
change.device = virtualEthernetCard;
change.operation = VcVirtualDeviceConfigSpecOperation.edit;
deviceChange.push(change);