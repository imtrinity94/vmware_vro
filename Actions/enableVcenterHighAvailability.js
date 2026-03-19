/**
 * @description Deploys a vCenter High Availability (VCHA) cluster by configuring the active,
 *              passive, and witness node specs and submitting the deployment task.
 *
 * @note Source: https://www.definit.co.uk/2018/09/enable-vcenter-high-availability-with-vrealize-orchestrator/
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string} haActiveIp - IP address for the active node management interface.
 * @param {string} haPassiveIp - IP address for the passive node management interface.
 * @param {string} haWitnessIp - IP address for the witness node management interface.
 * @param {string} haSubnetMask - Subnet mask for all HA nodes.
 * @param {VC:Network} haNetworkPortGroup - The port group for the HA management network.
 * @param {VC:VirtualMachine} vCenterVM - The vCenter appliance VM representing the active node.
 * @param {string} vCenterUser - The vCenter administrator username for service locator.
 * @param {string} vCenterPassword - The vCenter administrator password for service locator.
 * @param {VC:SdkConnection} vCenterSDK - The vCenter SDK connection.
 * @param {string} vCenterSSLThumbprint - The SSL thumbprint of the vCenter server.
 * @param {VC:Datastore} haPassiveDatastore - Datastore for the passive node.
 * @param {VC:Datastore} haWitnessDatastore - Datastore for the witness node.
 * @returns {VC:Task} The vCenter task for the VCHA deployment.
 */

// Configure Active Node Settings
var activeIpSpec = new VcCustomizationFixedIp();
activeIpSpec.IpAddress = haActiveIp;

var activeIpSettings = new VcCustomizationIPSettings();
activeIpSettings.SubnetMask = haSubnetMask;
activeIpSettings.Ip = activeIpSpec;

var activeNetworkConfig = new VcClusterNetworkConfigSpec();
activeNetworkConfig.NetworkPortGroup = haNetworkPortGroup;
activeNetworkConfig.IpSettings = activeIpSettings;

var vchaServiceLocator = new VcServiceLocator();
vchaServiceLocator.credential = new VcServiceLocatorNamePassword();
vchaServiceLocator.credential.username = vCenterUser;
vchaServiceLocator.credential.password = vCenterPassword;
vchaServiceLocator.instanceUuid = vCenterSDK.instanceUuid;
vchaServiceLocator.url = "https://" + vCenterSDK.sdkId;
vchaServiceLocator.sslThumbprint = vCenterSSLThumbprint;

var activeNodeSpec = new VcSourceNodeSpec();
activeNodeSpec.ActiveVc = vCenterVM;
activeNodeSpec.ManagementVc = vchaServiceLocator;

// Configure Passive Node Settings
var passiveIpSpec = new VcCustomizationFixedIp();
passiveIpSpec.IpAddress = haPassiveIp;

var passiveIpSettings = new VcCustomizationIPSettings();
passiveIpSettings.SubnetMask = haSubnetMask;
passiveIpSettings.Ip = passiveIpSpec;

var passiveNodeSpec = new VcPassiveNodeDeploymentSpec();
passiveNodeSpec.folder = vCenterVM.parent;
passiveNodeSpec.nodeName = vCenterVM.name + "-passive";
passiveNodeSpec.ipSettings = passiveIpSettings;
passiveNodeSpec.datastore = haPassiveDatastore;

// Configure Witness Node Settings
var witnessIpSpec = new VcCustomizationFixedIp();
witnessIpSpec.IpAddress = haWitnessIp;

var witnessIpSettings = new VcCustomizationIPSettings();
witnessIpSettings.SubnetMask = haSubnetMask;
witnessIpSettings.Ip = witnessIpSpec;

var witnessNodeSpec = new VcNodeDeploymentSpec();
witnessNodeSpec.folder = vCenterVM.parent;
witnessNodeSpec.nodeName = vCenterVM.name + "-witness";
witnessNodeSpec.ipSettings = witnessIpSettings;
witnessNodeSpec.datastore = haWitnessDatastore;

var vchaClusterDeploySpec = new VcVchaClusterDeploymentSpec();
vchaClusterDeploySpec.witnessDeploymentSpec = witnessNodeSpec;
vchaClusterDeploySpec.passiveDeploymentSpec = passiveNodeSpec;
vchaClusterDeploySpec.activeVcNetworkConfig = activeNetworkConfig;
vchaClusterDeploySpec.activeVcSpec = activeNodeSpec;

System.log("Initiating VCHA deployment task for VM: " + vCenterVM.name);

var vchaInstanceRef = new VcManagedObjectReference();
vchaInstanceRef.type = "ServiceInstance";
vchaInstanceRef.value = "ServiceInstance";
var vchaServiceInstance = VcPlugin.convertToVimManagedObject(vCenterSDK, vchaInstanceRef);

var vchaServiceContent = vchaServiceInstance.retrieveServiceContent();
var vchaClusterConfigurator = vchaServiceContent.failoverClusterConfigurator;

return vchaClusterConfigurator.deployVcha_Task(vchaClusterDeploySpec);
