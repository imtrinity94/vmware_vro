var blnClusterMode;
	blnClusterMode = true;

var intActiveNodes;
	intActiveNodes = 2;	

var intFailOverHeartBeats;
	intFailOverHeartBeats = 3;
	
var intHeartBeatInterval;
	intHeartBeatInterval = 5000;
	
var objConfiguratorServerAvailabilityAction;
	objConfiguratorServerAvailabilityAction = Config.getServerAvailabilityAction();

var objConfiguratorServerAvailability;
	objConfiguratorServerAvailability = objConfiguratorServerAvailabilityAction.getModel();
	objConfiguratorServerAvailability.setClusterMode(blnClusterMode);
	objConfiguratorServerAvailability.setActiveNodes(intActiveNodes);
	objConfiguratorServerAvailability.setFailoverHeartbeats(intFailOverHeartBeats);
	objConfiguratorServerAvailability.setHeartbeatInterval(intHeartBeatInterval);

var strError;
	strError = objConfiguratorServerAvailabilityAction.execute();
