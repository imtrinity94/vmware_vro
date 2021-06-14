// Set DCUI Trusted Users
// input host typeof(host : VC:HostSystem)
optionManager = host.configManager.advancedOption;
var trustedUsers=optionManager.queryOptions('DCUI.Access');
var userUpdate = "";

if (dcuiTrustedUsers.length > 0) {
    for (i=0;i<dcuiTrustedUsers.length;i++) {
		userUpdate=userUpdate+dcuiTrustedUsers[i]+",";
	}
	userUpdate=userUpdate + "root";
	trustedUsers[0].value=userUpdate;
	optionManager.updateOptions(trustedUsers);
}

//Set DCUI Timeout
optionManager = host.configManager.advancedOption;
var DcuiTimeout=optionManager.queryOptions('UserVars.DcuiTimeOut');

DcuiTimeout[0].value_IntValue=600;

optionManager.updateOptions(DcuiTimeout);









