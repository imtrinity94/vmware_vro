//How to get vApp Network > OrgVDC Network > External Network?
var vApp = vCDHost.getEntityById(VclFinderType.VAPP, parsedData.VAppId);
        if (vApp != null) {
            if (vApp != null) {
                System.log("\nvApp is " + vApp.name);
                var vAppNetworks = vApp.getVAppNetworks();
            }
            if (vAppNetworks != null) {
                for each(var myvAppNetwork in vAppNetworks) {
                    var parentOrgNetworkReference = myvAppNetwork.configuration.parentNetwork;
                    if (parentOrgNetworkReference != null) {
                        var parentOrgNetwork = vCDHost.getEntityByReference(VclFinderType.ADMIN_ORG_VDC_NETWORK, parentOrgNetworkReference);
                        if (parentOrgNetwork != null) System.log("ORG_VDC NETWORK NAME; " + parentOrgNetwork.name);
						//parentOrgNetwork = parentOrgNetwork.toUserObject();
						var parentExternalNetworkReference = parentOrgNetwork.configuration.parentNetwork;
						System.log(parentExternalNetworkReference);
                    		if (parentExternalNetworkReference != null) {
                        var parentExternalNetwork = vCDHost.getEntityByReference(VclFinderType.EXTERNAL_NETWORK, parentExternalNetworkReference);
                        if (parentExternalNetwork != null) System.log("EXT NETWORK NAME; " + parentExternalNetwork.name);
					
                    }
                    }
                }
          

-------------------------------------------------------
for each (var i in JSON.parse(availableVMsInVCloud)){
	if(i.AdditionalData){
		var parsedData = JSON.parse(i.AdditionalData);
		//System.log(parsedData.VAppId);
		var vApp = vCDHost.getEntityById(VclFinderType.VAPP,parsedData.VAppId);
		if(vApp != null){
			var myvAppNetworks = vApp.getVAppNetworks();
			for each(var NW in myvAppNetworks){
				System.debug("Network found in VApp("+parsedData.VAppId+"): "+NW.name);
				var parentNW = NW.configuration.parentNetwork;
				var net = vCDHost.getEntityByReference(VclFinderType.ADMIN_ORG_VDC_NETWORK,parentNW);
				if(net != null) System.log(net.name);
			}
		}
		else System.warn("Unable to find VApp("+parsedData.VAppId+") in "+vCDHost.url);
	}
}

------------

System.sleep(5000);
var inputName = ""; 
var inputProperties = new Properties();

var notificationHelper = new VclNotificationHelper();
notificationHelper.setMessage(messageBody);

var organizationLink = notificationHelper.getOrgLink();


organization = vcdHost.getEntityById(VclFinderType.ORGANIZATION, organizationLink.id);
System.log("organization Name : " + organization.name);
inputName = workflowInputOfType(wf, System.getObjectType(organization));
if (inputName.length) inputProperties.put(inputName, organization);

var notification = notificationHelper.getNotification();
notificationType = VclEventType.getObject(notification.type);
System.log("notificationType : " + notificationType.value);
inputName = workflowInputOfType(wf, System.getObjectType(notificationType));
if (inputName.length) inputProperties.put(inputName, notificationType);

// Filtering out too old messages - not done yet
var timestamp = notification.timestamp;
var year = timestamp.getYear();
var month = timestamp.getMonth()-1;
var day = timestamp.getDay();
var hours = timestamp.getHour();
var minutes = timestamp.getMinute();
var seconds = timestamp.getSecond();
var vcdTimezoneMinutesOffset = timestamp.getTimezone();
//System.log("vCD server offset is GMT" + vcdTimezoneMinutesOffset/60 );

var notificationTime = new Date(year , month , day , hours , minutes , seconds);
System.log("vCD notification (vCD local time) : " + notificationTime);

var vcoLocalTime = new Date();
var vcoTimezoneMinutesOffset = -vcoLocalTime.getTimezoneOffset();
//System.log("vCO server offset is GMT" + (vcoTimezoneMinutesOffset/60) );

var notificationLocalTime = new Date(notificationTime.getTime() - (vcdTimezoneMinutesOffset * 60000) + (vcoTimezoneMinutesOffset * 60000));
System.log("vCD notification (vCO local time) : " + notificationLocalTime);
//System.log("vCO local time : " + vcoLocalTime);

var timeDifference = vcoLocalTime.getTime() - notificationLocalTime.getTime();
System.log("This notification is " + timeDifference/1000 + " seconds old");
Server.log("Notification age", timeDifference/1000 + " seconds");

operationSuccess =  notification.operationSuccess;
System.log("operationSuccess : " + operationSuccess);
if (workflowHasInput(wf, "operationSuccess") == true) inputProperties.put("operationSuccess", operationSuccess);


var userLink = notificationHelper.getUserLink();
user = vcdHost.getEntityById(VclFinderType.USER, userLink.id);
if (user != null) {
	System.log("user : " + user.name);
	inputName = workflowInputOfType(wf, System.getObjectType(user));
	if (inputName.length >0) inputProperties.put(inputName, user);
}

var entityLink = notificationHelper.getEntityLink();
System.log("entityLink.type : " + entityLink.type);
System.log("entityLink.name : " + entityLink.name);


//I could have put this in an entity var and pass it to the subworkflows but using attributes is much better to troubleshoot after wf execution
switch(entityLink.type) {
	case "vcloud:blockingTask" : 
		entityBlockingTask = vcdHost.getEntityById(VclFinderType.BLOCKING_TASK, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityBlockingTask", System.getObjectType(entityBlockingTask));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityBlockingTask));
		if (inputName.length >0) inputProperties.put(inputName, entityBlockingTask);
		break;

	case "vcloud:catalog" : 
		entityCatalog = vcdHost.getEntityById(VclFinderType.CATALOG, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityCatalog", System.getObjectType(entityCatalog));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityCatalog));
		if (inputName.length >0) inputProperties.put(inputName, entityCatalog);		
		break;
			
	case "vcloud:catalogitem" : 
		entityCatalogItem = vcdHost.getEntityById(VclFinderType.CATALOG_ITEM, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityCatalogItem", System.getObjectType(entityCatalogItem));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityCatalogItem));
		if (inputName.length >0) inputProperties.put(inputName, entityCatalogItem);		
		break;
			
	case "vcloud:datastore" : 
		entityDatastore = vcdHost.getEntityById(VclFinderType.VMW_DATASTORE, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityDatastore", System.getObjectType(entityDatastore));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityDatastore));
		if (inputName.length >0) inputProperties.put(inputName, entityDatastore);		
		break;			
			
	case "vcloud:disk" : 
		entityDisk = vcdHost.getEntityById(VclFinderType.DISK, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityDisk", System.getObjectType(entityDisk));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityDisk));
		if (inputName.length >0) inputProperties.put(inputName, entityDisk);		
		break;
					
	case "vcloud:gateway" : 
		entityGateway = vcdHost.getEntityById(VclFinderType.GATEWAY, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityGateway", System.getObjectType(entityGateway));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityGateway));
		if (inputName.length >0) inputProperties.put(inputName, entityGateway);		
		break;	
								
	case "vcloud:group" : 
		entityGroup = vcdHost.getEntityById(VclFinderType.GROUP, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityGroup", System.getObjectType(entityGroup));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityGroup));
		if (inputName.length >0) inputProperties.put(inputName, entityGroup);		
		break;
													
	case "vcloud:host" : 
		entityHost = vcdHost.getEntityById(VclFinderType.VMW_HOST, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityHost", System.getObjectType(entityHost));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityHost));
		if (inputName.length >0) inputProperties.put(inputName, entityHost);		
		break;

	case "vcloud:media" : 
		entityMedia = vcdHost.getEntityById(VclFinderType.MEDIA, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityMedia", System.getObjectType(entityMedia));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityMedia));
		if (inputName.length >0) inputProperties.put(inputName, entityMedia);		
		break;
										
	case "vcloud:network" : 
		entityOrgVdcNetwork = vcdHost.getEntityById(VclFinderType.ORG_VDC_NETWORK, entityLink.id);
		if (entityOrgVdcNetwork != null) {
			inputName = getWorkflowInputName(wf, "entityOrgVdcNetwork", System.getObjectType(entityOrgVdcNetwork));
			//inputName = workflowInputOfType(wf, System.getObjectType(entityOrgVdcNetwork));
			if (inputName.length >0) inputProperties.put(inputName, entityOrgVdcNetwork);	
		}
		
		entityVAppNetwork = vcdHost.getEntityById(VclFinderType.VAPP_NETWORK, entityLink.id);
		if (entityVAppNetwork != null) {
			inputName = getWorkflowInputName(wf, "entityVAppNetwork", System.getObjectType(entityVAppNetwork));
			//inputName = workflowInputOfType(wf, System.getObjectType(entityVAppNetwork));
			if (inputName.length >0) inputProperties.put(inputName, entityVAppNetwork);	
		}
		
		entityExternalNetwork = vcdHost.getEntityById(VclFinderType.VMW_EXTERNAL_NETWORK, entityLink.id);
		if (entityExternalNetwork != null) {
			inputName = getWorkflowInputName(wf, "entityExternalNetwork", System.getObjectType(entityExternalNetwork));
			//inputName = workflowInputOfType(wf, System.getObjectType(entityExternalNetwork));
			if (inputName.length >0) inputProperties.put(inputName, entityExternalNetwork);	
		}
		break;
										
	case "vcloud:networkPool" : 
		entityNetworkPool = vcdHost.getEntityById(VclFinderType.VMW_NETWORK_POOL, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityNetworkPool", System.getObjectType(entityNetworkPool));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityNetworkPool));
		if (inputName.length >0) inputProperties.put(inputName, entityNetworkPool);		
		break;
																																					
	case "vcloud:org" : 
		entityOrganization = vcdHost.getEntityById(VclFinderType.ORGANIZATION, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityOrganization", System.getObjectType(entityOrganization));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityOrganization));
		if (inputName.length >0) inputProperties.put(inputName, entityOrganization);		
		break;
			
	case "vcloud:providervdc" : 
		entityProviderVdc = vcdHost.getEntityById(VclFinderType.VMW_PROVIDER_VDC, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityProviderVdc", System.getObjectType(entityProviderVdc));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityProviderVdc));
		if (inputName.length >0) inputProperties.put(inputName, entityProviderVdc);		
		break;

		// id="urn:vcloud:vdcstorageProfile:59"
     		// href="https://vcloud.example.com/api/vdcStorageProfile/59"
	case "vcloud:lr.providervdcstorageclass" : //Bug 890059 
		entityProviderVdcStorageProfile = vcdHost.getEntityById(VclFinderType.VDC_STORAGE_PROFILE, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityProviderVdcStorageProfile", System.getObjectType(entityProviderVdcStorageProfile));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityProviderVdcStorageProfile));
		if (inputName.length >0) inputProperties.put(inputName, entityProviderVdcStorageProfile);		
		break;
									
	case "vcloud:right" : 
		entityRight = vcdHost.getEntityById(VclFinderType.RIGHT, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityRight", System.getObjectType(entityRight));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityRight));
		if (inputName.length >0) inputProperties.put(inputName, entityRight);		
		break;
					
	case "vcloud:role" : 
		entityRole = vcdHost.getEntityById(VclFinderType.ROLE, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityRole", System.getObjectType(entityRole));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityRole));
		if (inputName.length >0) inputProperties.put(inputName, entityRole);		
		break;
																									
	case "vcloud:strandeditem" : 
		entityStrandedItem = vcdHost.getEntityById(VclFinderType.STRANDED_ITEM, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityStrandedItem", System.getObjectType(entityStrandedItem));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityStrandedItem));
		if (inputName.length >0) inputProperties.put(inputName, entityStrandedItem);		
		break;
																							
	case "vcloud:task" : 
		entityTask = vcdHost.getEntityById(VclFinderType.TASK, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityTask", System.getObjectType(entityTask));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityTask));
		if (inputName.length >0) inputProperties.put(inputName, entityTask);		
		break;

	case "vcloud:user" : 
		entityUser = vcdHost.getEntityById(VclFinderType.USER, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityUser", System.getObjectType(entityUser));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityUser));
		if (inputName.length >0) inputProperties.put(inputName, entityUser);		
		break;										
																														
	case "vcloud:vapp" : 
		entityVApp = vcdHost.getEntityById(VclFinderType.VAPP, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityVApp", System.getObjectType(entityVApp));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityVApp));
		if (inputName.length >0) inputProperties.put(inputName, entityVApp);		
		break;
										
	case "vcloud:vapptemplate" : 
		entityVAppTemplate = vcdHost.getEntityById(VclFinderType.VAPP_TEMPLATE, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityVAppTemplate", System.getObjectType(entityVAppTemplate));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityVAppTemplate));
		if (inputName.length >0) inputProperties.put(inputName, entityVAppTemplate);		
		break;
										
	case "vcloud:vdc" : 
		entityVdc = vcdHost.getEntityById(VclFinderType.VDC, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityVdc", System.getObjectType(entityVdc));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityVdc));
		if (inputName.length >0) inputProperties.put(inputName, entityVdc);		
		break;
																			
	case "vcloud:lr.vdcstorageclass" : //Bug 890059 
		entityVdcStorageProfile = vcdHost.getEntityById(VclFinderType.VDC_STORAGE_PROFILE, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityVdcStorageProfile", System.getObjectType(entityVdcStorageProfile));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityVdcStorageProfile));
		if (inputName.length >0) inputProperties.put(inputName, entityVdcStorageProfile);		
		break;
												
	case "vcloud:vimserver" : 
		entityVimServer = vcdHost.getEntityById(VclFinderType.VIM_SERVER, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityVimServer", System.getObjectType(entityVimServer));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityVimServer));
		if (inputName.length >0) inputProperties.put(inputName, entityVimServer);		
		break;
										
	case "vcloud:vm" : 
		entityVm = vcdHost.getEntityById(VclFinderType.VM, entityLink.id);
		inputName = getWorkflowInputName(wf, "entityVm", System.getObjectType(entityVm));
		//inputName = workflowInputOfType(wf, System.getObjectType(entityVm));
		if (inputName.length >0) inputProperties.put(inputName, entityVm);		
		break;
										
	default: System.warn("Unidentified entityLink.type : " + entityLink.type);
}		


var taskOwnerLink = notificationHelper.getTaskOwnerLink();
System.log("taskOwnerLink.type : " + taskOwnerLink.type);
System.log("taskOwnerLink.name : " + taskOwnerLink.name);
switch(taskOwnerLink.type) {
	case "vcloud:blockingTask" : 
		taskOwnerBlockingTask = vcdHost.getEntityById(VclFinderType.BLOCKING_TASK, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerBlockingTask", System.getObjectType(taskOwnerBlockingTask));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerBlockingTask));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerBlockingTask);		
		break;

	case "vcloud:catalog" : 
		taskOwnerCatalog = vcdHost.getEntityById(VclFinderType.CATALOG, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerCatalog", System.getObjectType(taskOwnerCatalog));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerCatalog));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerCatalog);		
		break;
			
	case "vcloud:catalogitem" : 
		taskOwnerCatalogItem = vcdHost.getEntityById(VclFinderType.CATALOG_ITEM, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerCatalogItem", System.getObjectType(taskOwnerCatalogItem));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerCatalogItem));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerCatalogItem);		
		break;
			
	case "vcloud:datastore" : 
		taskOwnerDatastore = vcdHost.getEntityById(VclFinderType.VMW_DATASTORE, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerDatastore", System.getObjectType(taskOwnerDatastore));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerDatastore));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerDatastore);		
		break;
			
	case "vcloud:disk" : 
		taskOwnerDisk = vcdHost.getEntityById(VclFinderType.DISK, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerDisk", System.getObjectType(taskOwnerDisk));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerDisk));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerDisk);		
		break;						

	case "vcloud:gateway" : 
		taskOwnerGateway = vcdHost.getEntityById(VclFinderType.GATEWAY, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerGateway", System.getObjectType(taskOwnerGateway));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerGateway));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerGateway);		
		break;
																		
	case "vcloud:group" : 
		taskOwnerGroup = vcdHost.getEntityById(VclFinderType.GROUP, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerGroup", System.getObjectType(taskOwnerGroup));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerGroup));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerGroup);		
		break;
													
	case "vcloud:host" : 
		taskOwnerHost = vcdHost.getEntityById(VclFinderType.VMW_HOST, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerHost", System.getObjectType(taskOwnerHost));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerHost));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerHost);		
		break;

	case "vcloud:media" : 
		taskOwnerMedia = vcdHost.getEntityById(VclFinderType.MEDIA, taskOwnerLink.id);
		inputName = getWorkflowInputName(wf, "taskOwnerMedia", System.getObjectType(taskOwnerMedia));
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerMedia));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerMedia);		
		break;
										
	case "vcloud:network" :
		taskOwnerOrgVdcNetwork = vcdHost.getEntityById(VclFinderType.ORG_VDC_NETWORK, entityLink.id);
		if (taskOwnerOrgVdcNetwork != null) {
			inputName = getWorkflowInputName(wf, "taskOwnerOrgVdcNetwork", System.getObjectType(taskOwnerOrgVdcNetwork));
			//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerOrgVdcNetwork));
			if (inputName.length >0) inputProperties.put(inputName, taskOwnerOrgVdcNetwork);	
		}
		
		taskOwnerVAppNetwork = vcdHost.getEntityById(VclFinderType.VAPP_NETWORK, entityLink.id);
		if (taskOwnerVAppNetwork != null) {
			inputName = getWorkflowInputName(wf, "taskOwnerVAppNetwork", System.getObjectType(taskOwnerVAppNetwork));
			//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerVAppNetwork));
			if (inputName.length >0) inputProperties.put(inputName, taskOwnerVAppNetwork);	
		}
		
		taskOwnerExternalNetwork = vcdHost.getEntityById(VclFinderType.VMW_EXTERNAL_NETWORK, entityLink.id);
		if (taskOwnerExternalNetwork != null) {
			//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerExternalNetwork));
			inputName = getWorkflowInputName(wf, "taskOwnerExternalNetwork", System.getObjectType(taskOwnerExternalNetwork));
			if (inputName.length >0) inputProperties.put(inputName, taskOwnerExternalNetwork);	
		}
		break;

										
	case "vcloud:networkPool" : 
		taskOwnerNetworkPool = vcdHost.getEntityById(VclFinderType.VMW_NETWORK_POOL, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerNetworkPool));
		inputName = getWorkflowInputName(wf, "taskOwnerNetworkPool", System.getObjectType(taskOwnerNetworkPool));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerNetworkPool);		
		break;
																																					
	case "vcloud:org" : 
		taskOwnerOrganization = vcdHost.getEntityById(VclFinderType.ORGANIZATION, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerOrganization));
		inputName = getWorkflowInputName(wf, "taskOwnerOrganization", System.getObjectType(taskOwnerOrganization));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerOrganization);		
		break;
			
	case "vcloud:providervdc" : 
		taskOwnerProviderVdc = vcdHost.getEntityById(VclFinderType.VMW_PROVIDER_VDC, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerProviderVdc));
		inputName = getWorkflowInputName(wf, "taskOwnerProviderVdc", System.getObjectType(taskOwnerProviderVdc));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerProviderVdc);		
		break;

	case "vcloud:lr.providervdcstorageclass" : //Bug 890059 
		taskOwnerProviderVdcStorageProfile = vcdHost.getEntityById(VclFinderType.VDC_STORAGE_PROFILE, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerProviderVdcStorageProfile));
		inputName = getWorkflowInputName(wf, "taskOwnerProviderVdcStorageProfile", System.getObjectType(taskOwnerProviderVdcStorageProfile));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerProviderVdcStorageProfile);		
		break;			
									
	case "vcloud:right" : 
		taskOwnerRight = vcdHost.getEntityById(VclFinderType.RIGHT, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerRight));
		inputName = getWorkflowInputName(wf, "taskOwnerRight", System.getObjectType(taskOwnerRight));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerRight);		
		break;
					
	case "vcloud:role" : 
		taskOwnerRole = vcdHost.getEntityById(VclFinderType.ROLE, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerRole));
		inputName = getWorkflowInputName(wf, "taskOwnerRole", System.getObjectType(taskOwnerRole));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerRole);		
		break;

	case "vcloud:strandeditem" : 
		taskOwnerStrandedItem = vcdHost.getEntityById(VclFinderType.STRANDED_ITEM, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerStrandedItem));
		inputName = getWorkflowInputName(wf, "taskOwnerStrandedItem", System.getObjectType(taskOwnerStrandedItem));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerStrandedItem);		
		break;
																					
	case "vcloud:task" : 
		taskOwnerTask = vcdHost.getEntityById(VclFinderType.TASK, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerTask));
		inputName = getWorkflowInputName(wf, "taskOwnerTask", System.getObjectType(taskOwnerTask));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerTask);		
		break;;

	case "vcloud:user" : 
		taskOwnerUser = vcdHost.getEntityById(VclFinderType.USER, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerUser));
		inputName = getWorkflowInputName(wf, "taskOwnerUser", System.getObjectType(taskOwnerUser));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerUser);		
		break;										
																														
	case "vcloud:vapp" : 
		taskOwnerVApp = vcdHost.getEntityById(VclFinderType.VAPP, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerVApp));
		inputName = getWorkflowInputName(wf, "taskOwnerVApp", System.getObjectType(taskOwnerVApp));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerVApp);		
		break;
										
	case "vcloud:vapptemplate" : 
		taskOwnerVAppTemplate = vcdHost.getEntityById(VclFinderType.VAPP_TEMPLATE, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerVAppTemplate));
		inputName = getWorkflowInputName(wf, "taskOwnerVAppTemplate", System.getObjectType(taskOwnerVAppTemplate));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerVAppTemplate);		
		break;
										
	case "vcloud:vdc" : 
		taskOwnerVdc = vcdHost.getEntityById(VclFinderType.VDC, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerVdc));
		inputName = getWorkflowInputName(wf, "taskOwnerVdc", System.getObjectType(taskOwnerVdc));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerVdc);		
		break;

	case "vcloud:lr.vdcstorageclass" : //Bug 890059 
		taskOwnerVdcStorageProfile = vcdHost.getEntityById(VclFinderType.VDC_STORAGE_PROFILE, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerVdcStorageProfile));
		inputName = getWorkflowInputName(wf, "taskOwnerVdcStorageProfile", System.getObjectType(taskOwnerVdcStorageProfile));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerVdcStorageProfile);		
		break;

	case "vcloud:vimserver" : 
		taskOwnerVimServer = vcdHost.getEntityById(VclFinderType.VIM_SERVER, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerVimServer));
		inputName = getWorkflowInputName(wf, "taskOwnerVimServer", System.getObjectType(taskOwnerVimServer));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerVimServer);		
		break;

	case "vcloud:vm" : 
		taskOwnerVm = vcdHost.getEntityById(VclFinderType.VM, taskOwnerLink.id);
		//inputName = workflowInputOfType(wf, System.getObjectType(taskOwnerVm));
		inputName = getWorkflowInputName(wf, "taskOwnerVm", System.getObjectType(taskOwnerVm));
		if (inputName.length >0) inputProperties.put(inputName, taskOwnerVm);		
		break;
										
	default: throw("Unidentified taskOwnerLink.type : " + taskOwnerLink.type);
}	

//Blocking task
if (notificationHelper.isBlockingTask() == true) {
	
	var blockingTaskLink = notificationHelper.getBlockingTaskLink();
	blockingTask == null;
	blockingTask = vcdHost.getEntityById(VclFinderType.BLOCKING_TASK, blockingTaskLink.id);
	if (blockingTask != null) {
		System.log("blockingTask : " + blockingTask.name);
		inputName = workflowInputOfType(wf, System.getObjectType(blockingTask));
		if (inputName.length >0) inputProperties.put(inputName, blockingTask);
		//The task contains a getParams() method containing all the parameters for update operations (for example recomposeVAppParams)
		var taskReference = blockingTask.getTask();
		task = vcdHost.getEntityByReference(VclFinderType.TASK, taskReference);
		if (task != null) {
			System.log("task : " + task.name);
			inputName = workflowInputOfType(wf, System.getObjectType(task));
			if (inputName.length >0) inputProperties.put(inputName, task);
		}	
	}
	else {
		System.warn("Could not get the blocking task " + blockingTaskLink.id + " : " + blockingTaskLink.name);
		Server.warn("Could not get the blocking task " , blockingTaskLink.name + " : " + blockingTaskLink.id  );
		var availableBlockingTasks = Server.findAllForType("vCloud:BlockingTask");
		var availableBlockingTasksText = "";
		for each (var availableBlockingTask in availableBlockingTasks) {
			availableBlockingTasksText += availableBlockingTask.id + ":" + availableBlockingTask.name + " : " + availableBlockingTask.status + "\n";
			var taskOwnerRef = availableBlockingTask.taskOwner;
			System.warn("Task owner for waiting blocking task " + vcdHost.getEntityByReference(VclFinderType.VAPP, taskOwnerRef).name);
		}
		System.warn("Available blocking tasks on " + new Date() + " are : " + availableBlockingTasksText);
		Server.warn("Available blocking tasks on " + new Date() + " are : ", availableBlockingTasksText);
		
		
	}		
}


for each (var p in inputProperties.keys) {
	try {
		System.log("Setting " + p + log(inputProperties.get(p))); //" with parameter " + inputProperties.get(p));
	} catch(e) {System.log("Setting " + p + " with parameter " + inputProperties.get(p));}
}
System.log("Running workflow " + wf.name);
Server.log("Running workflow", wf.name);
token = wf.execute(inputProperties);


function workflowInputOfType(wf, type) {
	var wfInParameters = wf.inParameters;
	for each (var wfInParameter in wfInParameters) {
		if (wfInParameter.type == type) return wfInParameter.name;
	}
	return "";	
}

function getWorkflowInputName(wf, inputName, inputType) {
	System.log("getWorkflowInputName(wf, " + inputName +", " + inputType+ ");");
	var wfInParameters = wf.inParameters;
	for each (var wfInParameter in wfInParameters) {
		if (wfInParameter.name == inputName && wfInParameter.type == inputType) {
			System.log("Found input parameter with matching name and type : " + wfInParameter.name);
			return wfInParameter.name;
		}	
	}	
	//In case the input parameter name is not matching get it based on type
	for each (var wfInParameter in wfInParameters) {
		if (wfInParameter.type == inputType) {
		System.log("Found input parameter with matching type : " + wfInParameter.name);
		return wfInParameter.name;
		}
	}
	System.log("Did not find input parameter");
	return "";	
}


function workflowHasInput(wf, inputName) {
	var wfInParameters = wf.inParameters;
	for each (var wfInParameter in wfInParameters) {
		if (wfInParameter.name == inputName) return true;
	}
	return false;	
}


function log(object) {
	var log = "";
	var type = System.getObjectType(object);
	log += " (type = " + type;
	if (type.split(":")[1] == "EventType") {
		log += ", value : " + object.value;
	}
	else {
		if (type.split(":")[0] == "vCloud") {
			try {
				var objectName = object.name;
				if (objectName != null) log += ", name = " + objectName;

				var objectUrl = object.href;
				if (objectName != null) log += ", URL = " + objectUrl;
			}
			catch(e) {
				log += "object = " + object;
			}		
		}
		else log += ", value = " + object;
	}
	log += ")";
	return log;
}
