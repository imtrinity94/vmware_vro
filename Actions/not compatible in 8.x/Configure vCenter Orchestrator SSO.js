var blnAdvancedMode;
	blnAdvancedMode = true;

var strDomainName;
	strDomainName = "VCOFLOW";

var strGroupName;
	strGroupName = "vCenter Orchestrator Admins";

var strAdminGroup;
	strAdminGroup = strDomainName + "\\" + strGroupName;

var strHostName;
	strHostName = "vCenterSSO";

var strActiveDirectoryDomainName;
	strActiveDirectoryDomainName = "vcoflow.local";

var strFQDN;
	strFQDN = strHostName + "." + strActiveDirectoryDomainName;	

var strSSOAdminUser;
	strSSOAdminUser = "administrator@vsphere.local";

var strSSOAdminPassword;
	strSSOAdminPassword = "P@55w0rd!";

var intSSOClockTolerance;
	intSSOClockTolerance = 300;

var intSSOPort;
	intSSOPort = 7444;

var strTokenServiceURL;
	strTokenServiceURL = "https://" + strFQDN + ":" + intSSOPort + "/sts/STSService/vsphere.local";

var strAdminServiceURL;
	strAdminServiceURL = "https://" + strFQDN + ":" + intSSOPort + "/sso-adminserver/sdk/vsphere.local";

var objConfiguratorAuthentication;
	objConfiguratorAuthentication = Config.getAuthentication();

var objConfiguratorSSOConfiguratorAction;
	objConfiguratorSSOConfiguratorAction = objConfiguratorAuthentication.getSSOConfiguratorAction();

var objConfiguratorSSOAuthentication;
	objConfiguratorSSOAuthentication = objConfiguratorSSOConfiguratorAction.getModel();
	objConfiguratorSSOAuthentication.setAdvancedMode(blnAdvancedMode);
	objConfiguratorSSOAuthentication.setAdminGroup(strAdminGroup);
	objConfiguratorSSOAuthentication.setSSOAdminUser(strSSOAdminUser);
	objConfiguratorSSOAuthentication.setSSOAdminPassword(strSSOAdminPassword);
	objConfiguratorSSOAuthentication.setSSOClockTolerance(intSSOClockTolerance);
	objConfiguratorSSOAuthentication.setTokenServiceURL(strTokenServiceURL);
	objConfiguratorSSOAuthentication.setAdminServiceURL(strAdminServiceURL);

var strErrorsValidate;
	strErrorsValidate = objConfiguratorSSOConfiguratorAction.validate();

var strErrorsExecute;
	strErrorsExecute = objConfiguratorSSOConfiguratorAction.execute();
