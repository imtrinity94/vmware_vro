var objVclGatewayConfiguration;
	objVclGatewayConfiguration = objVclGateway.configuration;

var objVclGatewayFeatures;
	objVclGatewayFeatures = objVclGatewayConfiguration.edgeGatewayServiceConfiguration;

var objVclAbstractObjectSet;
	objVclAbstractObjectSet = objVclGatewayFeatures.networkService;

var arrVclFirewallService;
	arrVclFirewallService = objVclAbstractObjectSet.find(new VclFirewallService());

var objVclFirewallService;
	objVclFirewallService = arrVclFirewallService[0];

var objVclObjectListVclFirewallRule;
	objVclObjectListVclFirewallRule = objVclFirewallService.firewallRule;

var arrVclFirewallRule;
	arrVclFirewallRule = objVclObjectListVclFirewallRule.enumerate();

//====================================================================================================

var objVclGatewayConfigurationNew;
	objVclGatewayConfigurationNew = objVclGatewayNew.configuration;

var objVclGatewayFeaturesNew;
	objVclGatewayFeaturesNew = objVclGatewayConfigurationNew.edgeGatewayServiceConfiguration;

var objVclAbstractObjectSetNew;
	objVclAbstractObjectSetNew = objVclGatewayFeaturesNew.networkService;

var arrVclFirewallServiceNew;
	arrVclFirewallServiceNew = objVclAbstractObjectSetNew.find(new VclFirewallService());

var objVclFirewallServiceNew;
	objVclFirewallServiceNew = arrVclFirewallServiceNew[0];

for ( var i = 0; i < arrVclFirewallRule.length; i++ )
{
	var objVclFirewallRule;
		objVclFirewallRule = arrVclFirewallRule[i];

	objVclFirewallServiceNew.firewallRule.add(objVclFirewallRule);
}

var objVclTask;
	objVclTask = objVclGatewayNew.update();
	
objCustomActions.waitVclTask(objVclTask);

