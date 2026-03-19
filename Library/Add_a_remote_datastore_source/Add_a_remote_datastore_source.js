/**
 * Add a remote datastore source
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} VCHost
 * @param {string} Username
 * @param {SecureString} Password
 * @return {VC:Task} task
 */



var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (!vsanConnection) {
  throw "VsanConnectionError: Could not find vSAN connection for SDK connection [${cluster.sdkConnection.name}]";
}

var vsan80u1supported = System.getModule("com.vmware.library.vsan").isVsan80u1Supported(cluster);
if (!vsan80u1supported) {
    throw "This feature supports starting from vSAN 80u1, you may need to use a VC version 80u1 or above"
}
if (vsanConnection.hostName == VCHost) {
    throw new Error("You cannot add a remote datastore source to itself. Please specify another vCenter IP.");
}

var vcInfo = new VsanVsanRemoteVcInfoStandalone();
vcInfo.vcHost = VCHost;
vcInfo.password = Password;
vcInfo.linkType = "standalone";
vcInfo.user = Username;
var queryvc = [];
queryvc.push(VCHost);
var _vsanRemoteDatastoreSystem = vsanConnection.vsanRemoteDatastoreSystem;
var addedRemoteDatastoreSource = _vsanRemoteDatastoreSystem.vsanQueryDatastoreSource(queryvc);
System.log(addedRemoteDatastoreSource);
if (addedRemoteDatastoreSource !== null) {
    for (var i = 0; i < addedRemoteDatastoreSource.length; i++) {
        var source = addedRemoteDatastoreSource[i];
        System.log(source);
        if (source.vcInfo.vcHost === VCHost) {
            throw new Error("You have already added the specified vCenter as the remote datastore source.");
        }
    }
}
var querySpecsproviderVcenter = new VsanVsanXvcQuerySpec();
querySpecsproviderVcenter.ObjectModel = "providerVcenter";
var querySpecs = [querySpecsproviderVcenter];
var extraVcInfo = new VsanVsanRemoteVcInfoStandalone();
extraVcInfo.linkType = "standalone";
extraVcInfo.password = Password;
extraVcInfo.user = Username;
extraVcInfo.vcHost = VCHost;
var extraVcInfos = [extraVcInfo];
var cert = "";
try {
    var result = _vsanRemoteDatastoreSystem.vsanQueryHciMeshDatastores(querySpecs, extraVcInfos);
    var resultItems = result[0].resultItems;
    for (var i = 0; i < resultItems.length; i++) {
        var item = resultItems[i];
        var len = item.propertyValues.length;  
        for (var j = 0; j < len; j++) {
            if (item.propertyValues[j] != null && item.propertyValues[j].value != null) {
                var curStr = item.propertyValues[j].value.toString();
                if (typeof curStr === 'string' && curStr.indexOf("VsanSslVerifyCertFault") === 0) {
                    var certFault = curStr;
                    var startIndex = certFault.indexOf("{");
                    var endIndex = certFault.lastIndexOf("}");
                    cert = certFault.substring(startIndex + 1, endIndex);
                    break;
                }
            }
        }  
    }
} catch (e) {
	var message = e.message;
	throw new Error(message);
}
if (!cert) {
    var message = "No valid cert fetched";
	throw new Error(message);
}

//Query and validate the input
var querySpecsclientVcenter = new VsanVsanXvcQuerySpec();
querySpecsclientVcenter.ObjectModel = "clientVcenter";
var querySpecsdatastore = new VsanVsanXvcQuerySpec();
querySpecsdatastore.ObjectModel = "datastore";
var querySpecsclientCluster = new VsanVsanXvcQuerySpec();
querySpecsclientCluster.ObjectModel = "clientCluster"; 
var querySpecsValidation = [querySpecsproviderVcenter, querySpecsclientVcenter, querySpecsdatastore, querySpecsclientCluster];
var vcInfoValidation = new VsanVsanRemoteVcInfoStandalone();
vcInfoValidation.vcHost = VCHost;
vcInfoValidation.password = Password;
vcInfoValidation.linkType = "standalone";
vcInfoValidation.user = Username;
vcInfoValidation.cert = cert;
var vcInfoValidations = [vcInfoValidation];
try {
    var resultValidation = _vsanRemoteDatastoreSystem.vsanQueryHciMeshDatastores(querySpecsValidation, vcInfoValidations);  
    var resultItems = resultValidation[0].resultItems;
    for (var i = 0; i < resultItems.length; i++) {
        var item = resultItems[i];    
        var len = item.propertyValues.length;
        for (var j = 0; j < len; j++) {
            var property = item.propertyValues[j];
        
            if (property.value != null && property.value.toString() != null) {
                var curStr = property.value.toString();
                if (typeof curStr === 'string' && curStr.indexOf("NotAuthenticated") === 0){
                    var message = "Not authenticated. Wrong username or password.";
                    throw new Error(message);
                }
            }
        }
    }
} catch (e){
    var message = e.message;
	throw new Error(message);
}


vcInfo.cert = cert
var datastoreSource = new VsanVsanHciMeshDatastoreSource();
datastoreSource.vcInfo = vcInfo;

var vsanTask = _vsanRemoteDatastoreSystem.vsanCreateDatastoreSource(datastoreSource);
var task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);



