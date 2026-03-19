/**
 * @description Copies all firewall rules from a source vShield Edge Gateway to a destination
 *              Edge Gateway. Reads firewall rules from the source and adds them one-by-one
 *              to the destination, then triggers an update task on the destination gateway.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclGateway} objVclGateway - The source vCloud Edge Gateway to copy rules from.
 * @param {VclGateway} objVclGatewayNew - The destination vCloud Edge Gateway to copy rules to.
 * @param {*} objCustomActions - A module reference providing the waitVclTask helper method.
 * @returns {void}
 */

var objVclGatewayConfiguration = objVclGateway.configuration;

var objVclGatewayFeatures = objVclGatewayConfiguration.edgeGatewayServiceConfiguration;

var objVclAbstractObjectSet = objVclGatewayFeatures.networkService;

var arrVclFirewallService = objVclAbstractObjectSet.find(new VclFirewallService());

var objVclFirewallService = arrVclFirewallService[0];

var objVclObjectListVclFirewallRule = objVclFirewallService.firewallRule;

var arrVclFirewallRule = objVclObjectListVclFirewallRule.enumerate();

//====================================================================================================

var objVclGatewayConfigurationNew = objVclGatewayNew.configuration;

var objVclGatewayFeaturesNew = objVclGatewayConfigurationNew.edgeGatewayServiceConfiguration;

var objVclAbstractObjectSetNew = objVclGatewayFeaturesNew.networkService;

var arrVclFirewallServiceNew = objVclAbstractObjectSetNew.find(new VclFirewallService());

var objVclFirewallServiceNew = arrVclFirewallServiceNew[0];

for (var i = 0; i < arrVclFirewallRule.length; i++) {
    var objVclFirewallRule = arrVclFirewallRule[i];

    objVclFirewallServiceNew.firewallRule.add(objVclFirewallRule);
}

var objVclTask = objVclGatewayNew.update();

objCustomActions.waitVclTask(objVclTask);
