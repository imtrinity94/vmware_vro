//Source https://www.definit.co.uk/2018/09/enable-vcenter-high-availability-with-vrealize-orchestrator/
// Configure Active Node Settings
var activeIPSpec = new VcCustomizationFixedIp();
activeIPSpec.IpAddress = haActiveIp

var activeIPSettings = new VcCustomizationIPSettings() ;
activeIPSettings.SubnetMask = haSubnetMask
activeIPSettings.Ip = activeIPSpec

var activeNetConfig = new VcClusterNetworkConfigSpec();
activeNetConfig.NetworkPortGroup = haNetworkPortGroup;
activeNetConfig.IpSettings = activeIPSettings;

var serviceLocator = new VcServiceLocator();
serviceLocator.credential = new VcServiceLocatorNamePassword();
serviceLocator.credential.username = vCenterUser;
serviceLocator.credential.password = vCenterPassword;
serviceLocator.instanceUuid = vCenterSDK.instanceUuid;
serviceLocator.url = "https://"+vCenterSDK.sdkId;
serviceLocator.sslThumbprint = vCenterSSLThumbprint;

var activeNodeSpec = new VcSourceNodeSpec() ;
activeNodeSpec.ActiveVc = vCenterVM;
activeNodeSpec.ManagementVc = serviceLocator;

// Configure Passive Node Settings
var passiveIPSpec = new VcCustomizationFixedIp();
passiveIPSpec.IpAddress = haPassiveIp;

var passiveIPSettings = new VcCustomizationIPSettings() ;
passiveIPSettings.SubnetMask = haSubnetMask;
passiveIPSettings.Ip = passiveIPSpec;

var passiveNodeSpec = new VcPassiveNodeDeploymentSpec() ;
passiveNodeSpec.folder = vCenterVM.parent;
passiveNodeSpec.nodeName = vCenterVM.name+"-passive";
passiveNodeSpec.ipSettings = passiveIPSettings;
passiveNodeSpec.datastore = haPassiveDatastore;

// Configure Witness Node Settings
var witnessIPSpec = new VcCustomizationFixedIp();
witnessIPSpec.IpAddress = haWitnessIp;

var witnessIPSettings = new VcCustomizationIPSettings() ;
witnessIPSettings.SubnetMask = haSubnetMask;
witnessIPSettings.Ip = witnessIPSpec;

var witnessNodeSpec = new VcNodeDeploymentSpec();
witnessNodeSpec.folder = vCenterVM.parent;
witnessNodeSpec.nodeName = vCenterVM.name+"-witness";
witnessNodeSpec.ipSettings = witnessIPSettings;
witnessNodeSpec.datastore = haWitnessDatastore;

var vcHADeploySpec = new VcVchaClusterDeploymentSpec();
vcHADeploySpec.witnessDeploymentSpec = witnessNodeSpec;
vcHADeploySpec.passiveDeploymentSpec = passiveNodeSpec;
vcHADeploySpec.activeVcNetworkConfig = activeNetConfig;
vcHADeploySpec.activeVcSpec = activeNodeSpec;

System.log("Starting deployment task...");

var instanceRef = new VcManagedObjectReference();
instanceRef.type = "ServiceInstance";
instanceRef.value = "ServiceInstance";
serviceInstance = VcPlugin.convertToVimManagedObject(vCenterSDK, instanceRef)

serviceContent = serviceInstance.retrieveServiceContent()
var vcHAClusterConfig = serviceContent.failoverClusterConfigurator;
return vcHAClusterConfig.deployVcha_Task(vcHADeploySpec);
