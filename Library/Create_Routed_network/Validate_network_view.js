/**
 * Validate network view
 *
 * @param {string} attrContainerView
 * @param {string} attrNetworkView
 */
if (attrContainerView != attrNetworkView) {
	throw "Network was created in network view which differs from the network view of parent container."
}