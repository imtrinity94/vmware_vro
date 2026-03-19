/**
 * Set remote datastore(s)
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {VC:Datastore} remotedatastore1
 * @param {boolean} isStretchedCluster1
 * @param {string} networkTopology1
 * @param {string} clientSiteName1
 * @param {string} serverSiteName1
 * @param {VC:ClusterComputeResource} serverCluster1
 * @param {VC:Datastore} remotedatastore2
 * @param {boolean} isStretchedCluster2
 * @param {string} networkTopology2
 * @param {string} clientSiteName2
 * @param {string} serverSiteName2
 * @param {VC:ClusterComputeResource} serverCluster2
 * @param {VC:Datastore} remotedatastore3
 * @param {boolean} isStretchedCluster3
 * @param {string} networkTopology3
 * @param {string} clientSiteName3
 * @param {string} serverSiteName3
 * @param {VC:ClusterComputeResource} serverCluster3
 * @param {VC:Datastore} remotedatastore4
 * @param {boolean} isStretchedCluster4
 * @param {string} networkTopology4
 * @param {string} clientSiteName4
 * @param {string} serverSiteName4
 * @param {VC:ClusterComputeResource} serverCluster4
 * @param {VC:Datastore} remotedatastore5
 * @param {boolean} isStretchedCluster5
 * @param {string} networkTopology5
 * @param {string} clientSiteName5
 * @param {string} serverSiteName5
 * @param {VC:ClusterComputeResource} serverCluster5
 * @return {VC:Task} task
 */
// Get vSAN connection from SDK connection
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (!vsanConnection) {
    throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

if (cluster != null && cluster.sdkConnection != null && cluster.sdkConnection.about != null) {
    var api = cluster.sdkConnection.about.apiVersion;
    System.debug(api);
}
var vsanEsaEnabled = System.getModule("com.vmware.library.vsan").isVsanEsa(cluster);
if (vsanEsaEnabled && api == "8.0.0.1") {
   throw "This is vSAN ESA enabled cluster. The cluster does not support mount remote datastore. The feature to mount remote datastores from vSAN ESA cluster supports starting from vSAN80U2";
}

var remoteDatastoreMoRefs = [];
if (remotedatastore1 != null) {
    var remoteDatastoreMoRef = new VsanManagedObjectReference(remotedatastore1.moref.type, remotedatastore1.moref.value);
    remoteDatastoreMoRefs.push(remoteDatastoreMoRef);
}
if (remotedatastore2 != null) {
    var remoteDatastoreMoRef = new VsanManagedObjectReference(remotedatastore2.moref.type, remotedatastore2.moref.value);
    remoteDatastoreMoRefs.push(remoteDatastoreMoRef);
}
if (remotedatastore3 != null) {
    var remoteDatastoreMoRef = new VsanManagedObjectReference(remotedatastore3.moref.type, remotedatastore3.moref.value);
    remoteDatastoreMoRefs.push(remoteDatastoreMoRef);
}
if (remotedatastore4 != null) {
    var remoteDatastoreMoRef = new VsanManagedObjectReference(remotedatastore4.moref.type, remotedatastore4.moref.value);
    remoteDatastoreMoRefs.push(remoteDatastoreMoRef);
}
if (remotedatastore5 != null) {
    var remoteDatastoreMoRef = new VsanManagedObjectReference(remotedatastore5.moref.type, remotedatastore5.moref.value);
    remoteDatastoreMoRefs.push(remoteDatastoreMoRef);
}
// Get VSAN advanced datastore configuration
var vsanClusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var vsanClusterConfig = vsanClusterConfigSystem.vsanClusterGetConfig(clusterMoRef);
var vsanAdvancedDatastoreConfig = new VsanVsanAdvancedDatastoreConfig();

vsanAdvancedDatastoreConfig.remoteDatastores = remoteDatastoreMoRefs;

// Create vSAN cluster reconfiguration specification
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;
configSpec.datastoreConfig = vsanAdvancedDatastoreConfig;


var vcRemoteVsanServerClusterInfos = [];
if (isStretchedCluster1) {
    var vcRemoteVsanServerClusterInfo = new VsanVcRemoteVsanServerClusterInfo();
    var remoteVsanSiteAffinityServer = new VsanRemoteVsanSiteAffinity();
    var remoteVsanSiteAffinityClient = new VsanRemoteVsanSiteAffinity();
    if (clientSiteName1 != null && clientSiteName1.trim() !== '') {
        System.debug("client site name is not empty")
        var clientSite = new VsanRemoteVsanSite();
        clientSite.name = clientSiteName1;
        remoteVsanSiteAffinityServer.clientSite = clientSite;
        var servereSite = new VsanRemoteVsanSite();
        servereSite.name = clientSiteName1;
        remoteVsanSiteAffinityClient.serverSite = servereSite;
        clientSite1 = new VsanRemoteVsanSite();
        clientSite1.name = serverSiteName1;
        remoteVsanSiteAffinityClient.clientSite = clientSite1;
    }
    var vsanConnection_server = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(serverCluster1.sdkConnection);
    if (!vsanConnection_server) {
        throw "You have to specify the server cluster. VsanConnectionError: Could not find vSAN connection for SDK connection [" + serverCluster.sdkConnection.name + "]";
    }
    var vsanClusterConfigSystem_server = vsanConnection_server.vsanVcClusterConfigSystem;
    var clusterMoRef_server = new VsanManagedObjectReference(serverCluster1.moref.type, serverCluster1.moref.value);
    var vsanClusterConfig_server = vsanClusterConfigSystem_server.vsanClusterGetConfig(clusterMoRef_server);
    //System.debug(vsanClusterConfig_server)

    if (serverSiteName1 != null) {
        var serverSite = new VsanRemoteVsanSite();
        serverSite.name = serverSiteName1;
        remoteVsanSiteAffinityServer.serverSite = serverSite;
    }
    var topology = networkTopology1;
    vcRemoteVsanServerClusterInfo.networkTopology = topology;
    vcRemoteVsanServerClusterInfo.clusterUuid = vsanClusterConfig_server.defaultConfig.uuid

    if (topology == "Symmetric") {
        vcRemoteVsanServerClusterInfo.siteAffinity = null;
    } else if (clientSiteName1 != null  && clientSiteName1.trim() !== '') {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        affinities.push(remoteVsanSiteAffinityClient)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    } else  {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    }
    vcRemoteVsanServerClusterInfos.push(vcRemoteVsanServerClusterInfo)

} 

if (isStretchedCluster2) {
    var vcRemoteVsanServerClusterInfo = new VsanVcRemoteVsanServerClusterInfo();
    var remoteVsanSiteAffinityServer = new VsanRemoteVsanSiteAffinity();
    var remoteVsanSiteAffinityClient = new VsanRemoteVsanSiteAffinity();
    if (clientSiteName2 != null && clientSiteName2.trim() !== '') {
        System.debug("client site name is not empty")
        var clientSite = new VsanRemoteVsanSite();
        clientSite.name = clientSiteName2;
        remoteVsanSiteAffinityServer.clientSite = clientSite;
        var servereSite = new VsanRemoteVsanSite();
        servereSite.name = clientSiteName2;
        remoteVsanSiteAffinityClient.serverSite = servereSite;
        clientSite2 = new VsanRemoteVsanSite();
        clientSite2.name = serverSiteName2;
        remoteVsanSiteAffinityClient.clientSite = clientSite2;
    }
    var vsanConnection_server = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(serverCluster2.sdkConnection);
    if (!vsanConnection_server) {
        throw "You have to specify the server cluster. VsanConnectionError: Could not find vSAN connection for SDK connection [" + serverCluster.sdkConnection.name + "]";
    }
    var vsanClusterConfigSystem_server = vsanConnection_server.vsanVcClusterConfigSystem;
    var clusterMoRef_server = new VsanManagedObjectReference(serverCluster2.moref.type, serverCluster2.moref.value);
    var vsanClusterConfig_server = vsanClusterConfigSystem_server.vsanClusterGetConfig(clusterMoRef_server);
    //System.debug(vsanClusterConfig_server)

    if (serverSiteName2 != null) {
        var serverSite = new VsanRemoteVsanSite();
        serverSite.name = serverSiteName2;
        remoteVsanSiteAffinityServer.serverSite = serverSite;
    }
    var topology = networkTopology2;
    vcRemoteVsanServerClusterInfo.networkTopology = topology;
    vcRemoteVsanServerClusterInfo.clusterUuid = vsanClusterConfig_server.defaultConfig.uuid

    if (topology == "Symmetric") {
        vcRemoteVsanServerClusterInfo.siteAffinity = null;
    } else if (clientSiteName2 != null  && clientSiteName2.trim() !== '') {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        affinities.push(remoteVsanSiteAffinityClient)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    } else  {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    }
    vcRemoteVsanServerClusterInfos.push(vcRemoteVsanServerClusterInfo)

} 
if (isStretchedCluster3) {
    var vcRemoteVsanServerClusterInfo = new VsanVcRemoteVsanServerClusterInfo();
    var remoteVsanSiteAffinityServer = new VsanRemoteVsanSiteAffinity();
    var remoteVsanSiteAffinityClient = new VsanRemoteVsanSiteAffinity();
    if (clientSiteName3 != null && clientSiteName3.trim() !== '') {
        System.debug("client site name is not empty")
        var clientSite = new VsanRemoteVsanSite();
        clientSite.name = clientSiteName3;
        remoteVsanSiteAffinityServer.clientSite = clientSite;
        var servereSite = new VsanRemoteVsanSite();
        servereSite.name = clientSiteName3;
        remoteVsanSiteAffinityClient.serverSite = servereSite;
        clientSite3 = new VsanRemoteVsanSite();
        clientSite3.name = serverSiteName3;
        remoteVsanSiteAffinityClient.clientSite = clientSite3;
    }
    var vsanConnection_server = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(serverCluster3.sdkConnection);
    if (!vsanConnection_server) {
        throw "You have to specify the server cluster. VsanConnectionError: Could not find vSAN connection for SDK connection [" + serverCluster.sdkConnection.name + "]";
    }
    var vsanClusterConfigSystem_server = vsanConnection_server.vsanVcClusterConfigSystem;
    var clusterMoRef_server = new VsanManagedObjectReference(serverCluster3.moref.type, serverCluster3.moref.value);
    var vsanClusterConfig_server = vsanClusterConfigSystem_server.vsanClusterGetConfig(clusterMoRef_server);
    //System.debug(vsanClusterConfig_server)

    if (serverSiteName3 != null) {
        var serverSite = new VsanRemoteVsanSite();
        serverSite.name = serverSiteName3;
        remoteVsanSiteAffinityServer.serverSite = serverSite;
    }
    var topology = networkTopology3;
    vcRemoteVsanServerClusterInfo.networkTopology = topology;
    vcRemoteVsanServerClusterInfo.clusterUuid = vsanClusterConfig_server.defaultConfig.uuid

    if (topology == "Symmetric") {
        vcRemoteVsanServerClusterInfo.siteAffinity = null;
    } else if (clientSiteName3 != null  && clientSiteName3.trim() !== '') {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        affinities.push(remoteVsanSiteAffinityClient)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    } else  {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    }
    vcRemoteVsanServerClusterInfos.push(vcRemoteVsanServerClusterInfo)

} 

if (isStretchedCluster4) {
    var vcRemoteVsanServerClusterInfo = new VsanVcRemoteVsanServerClusterInfo();
    var remoteVsanSiteAffinityServer = new VsanRemoteVsanSiteAffinity();
    var remoteVsanSiteAffinityClient = new VsanRemoteVsanSiteAffinity();
    if (clientSiteName4 != null && clientSiteName4.trim() !== '') {
        System.debug("client site name is not empty")
        var clientSite = new VsanRemoteVsanSite();
        clientSite.name = clientSiteName4;
        remoteVsanSiteAffinityServer.clientSite = clientSite;
        var servereSite = new VsanRemoteVsanSite();
        servereSite.name = clientSiteName4;
        remoteVsanSiteAffinityClient.serverSite = servereSite;
        clientSite4 = new VsanRemoteVsanSite();
        clientSite4.name = serverSiteName4;
        remoteVsanSiteAffinityClient.clientSite = clientSite4;
    }
    var vsanConnection_server = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(serverCluster4.sdkConnection);
    if (!vsanConnection_server) {
        throw "You have to specify the server cluster. VsanConnectionError: Could not find vSAN connection for SDK connection [" + serverCluster.sdkConnection.name + "]";
    }
    var vsanClusterConfigSystem_server = vsanConnection_server.vsanVcClusterConfigSystem;
    var clusterMoRef_server = new VsanManagedObjectReference(serverCluster4.moref.type, serverCluster4.moref.value);
    var vsanClusterConfig_server = vsanClusterConfigSystem_server.vsanClusterGetConfig(clusterMoRef_server);
    //System.debug(vsanClusterConfig_server)

    if (serverSiteName4 != null) {
        var serverSite = new VsanRemoteVsanSite();
        serverSite.name = serverSiteName4;
        remoteVsanSiteAffinityServer.serverSite = serverSite;
    }
    var topology = networkTopology4;
    vcRemoteVsanServerClusterInfo.networkTopology = topology;
    vcRemoteVsanServerClusterInfo.clusterUuid = vsanClusterConfig_server.defaultConfig.uuid

    if (topology == "Symmetric") {
        vcRemoteVsanServerClusterInfo.siteAffinity = null;
    } else if (clientSiteName4 != null  && clientSiteName4.trim() !== '') {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        affinities.push(remoteVsanSiteAffinityClient)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    } else  {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    }
    vcRemoteVsanServerClusterInfos.push(vcRemoteVsanServerClusterInfo)

} 

if (isStretchedCluster5) {
    var vcRemoteVsanServerClusterInfo = new VsanVcRemoteVsanServerClusterInfo();
    var remoteVsanSiteAffinityServer = new VsanRemoteVsanSiteAffinity();
    var remoteVsanSiteAffinityClient = new VsanRemoteVsanSiteAffinity();
    if (clientSiteName5 != null && clientSiteName5.trim() !== '') {
        System.debug("client site name is not empty")
        var clientSite = new VsanRemoteVsanSite();
        clientSite.name = clientSiteName5;
        remoteVsanSiteAffinityServer.clientSite = clientSite;
        var servereSite = new VsanRemoteVsanSite();
        servereSite.name = clientSiteName5;
        remoteVsanSiteAffinityClient.serverSite = servereSite;
        clientSite5 = new VsanRemoteVsanSite();
        clientSite5.name = serverSiteName5;
        remoteVsanSiteAffinityClient.clientSite = clientSite5;
    }
    var vsanConnection_server = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(serverCluster5.sdkConnection);
    if (!vsanConnection_server) {
        throw "You have to specify the server cluster. VsanConnectionError: Could not find vSAN connection for SDK connection [" + serverCluster.sdkConnection.name + "]";
    }
    var vsanClusterConfigSystem_server = vsanConnection_server.vsanVcClusterConfigSystem;
    var clusterMoRef_server = new VsanManagedObjectReference(serverCluster5.moref.type, serverCluster5.moref.value);
    var vsanClusterConfig_server = vsanClusterConfigSystem_server.vsanClusterGetConfig(clusterMoRef_server);
    //System.debug(vsanClusterConfig_server)

    if (serverSiteName5 != null) {
        var serverSite = new VsanRemoteVsanSite();
        serverSite.name = serverSiteName5;
        remoteVsanSiteAffinityServer.serverSite = serverSite;
    }
    var topology = networkTopology5;
    vcRemoteVsanServerClusterInfo.networkTopology = topology;
    vcRemoteVsanServerClusterInfo.clusterUuid = vsanClusterConfig_server.defaultConfig.uuid

    if (topology == "Symmetric") {
        vcRemoteVsanServerClusterInfo.siteAffinity = null;
    } else if (clientSiteName5 != null  && clientSiteName5.trim() !== '') {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        affinities.push(remoteVsanSiteAffinityClient)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    } else  {
        var affinities = []
        affinities.push(remoteVsanSiteAffinityServer)
        vcRemoteVsanServerClusterInfo.siteAffinity = affinities;
    }
    vcRemoteVsanServerClusterInfos.push(vcRemoteVsanServerClusterInfo)

} 
 

if (isStretchedCluster1 || isStretchedCluster2 || isStretchedCluster3 
    || isStretchedCluster4 || isStretchedCluster5) {
    var vsanvcremotevsanserverclusterconfig = new VsanVcRemoteVsanServerClusterConfig();
    vsanvcremotevsanserverclusterconfig.serverClusters = vcRemoteVsanServerClusterInfos
    configSpec.serverClusterConfig = vsanvcremotevsanserverclusterconfig
}
// Reconfigure vSAN cluster and get the task object
var vsanTask = vsanClusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
var task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
