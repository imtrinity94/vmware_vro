/**
 * Create cluster
 *
 * @param {VC:HostFolder} folder
 * @param {string} name
 * @param {boolean} haEnabled
 * @param {boolean} drsEnabled
 * @param {boolean} vsanEnabled
 * @param {boolean} vsanAutoClaimStorage
 * @return {VC:ClusterComputeResource} cluster
 */
var clusterConfigSpec = new VcClusterConfigSpecEx();
clusterConfigSpec.dasConfig = new VcClusterDasConfigInfo();
clusterConfigSpec.dasConfig.enabled = haEnabled;
clusterConfigSpec.dasConfig.admissionControlPolicy = new VcClusterFailoverLevelAdmissionControlPolicy();
clusterConfigSpec.dasConfig.admissionControlPolicy.failoverLevel = 2;
clusterConfigSpec.drsConfig = new VcClusterDrsConfigInfo();
clusterConfigSpec.drsConfig.enabled = drsEnabled;
clusterConfigSpec.dpmConfig = new VcClusterDpmConfigInfo();
clusterConfigSpec.dpmConfig.defaultDpmBehavior = VcDpmBehavior.automated;
if (vsanEnabled) {
    clusterConfigSpec.vsanConfig = new VcVsanClusterConfigInfo()
    clusterConfigSpec.vsanConfig.enabled = vsanEnabled
    clusterConfigSpec.vsanConfig.defaultConfig =  new VcVsanClusterConfigInfoHostDefaultInfo() ;
    clusterConfigSpec.vsanConfig.defaultConfig.autoClaimStorage = vsanAutoClaimStorage
}
cluster = folder.createClusterEx(name, clusterConfigSpec);
if (cluster == null) {
	throw "ReferenceError: Cannot create a cluster for an unknown reason.";
}