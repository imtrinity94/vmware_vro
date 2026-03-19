/**
 * Set compatible DNS view
 *
 * @param {InfobloxIPAM:IpamConnection} attrConnection
 * @param {string} networkView
 * @return {string} attrCompatibleDnsView
 */
var viewManager = attrConnection.getViewManager();

var effectiveNetworkView = networkView;
var isDefaultNetworkView = false;
if (!effectiveNetworkView) {
	effectiveNetworkView = viewManager.getDefaultNetworkView();
	isDefaultNetworkView = true;
}

var dnsViews = viewManager.getDnsViewsForNetworkView(effectiveNetworkView);
if (dnsViews.length > 0) {
	attrCompatibleDnsView = dnsViews[0];
} else {
	throw "No DNS views belong to the " + (isDefaultNetworkView ? "default " : "") +"network view [" + effectiveNetworkView + "] were found.";
}
