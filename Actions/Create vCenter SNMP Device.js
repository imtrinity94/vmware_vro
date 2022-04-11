var strAddress;
	strAddress = "vCenterServer.domain.local";

var strName;
	strName = "vCenter Server";

var intPort;
	intPort = 4000;

var strCommunity;
	strCommunity = "public";

var strVersion;
	strVersion = "V2C";

var objSNMPSnmpDevice;
	objSNMPSnmpDevice = SnmpService.createSnmpDeviceV1V2c(strAddress, strName, intPort, strCommunity, strVersion);
