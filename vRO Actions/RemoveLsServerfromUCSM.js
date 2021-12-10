System.log("Workflow: Remove LsServer");

//UCSM Fetch block
checkFlag = false;
try {
    var ucsDomainMatched = System.getModule("org.telus.xavient.util").getPluginObject("UCSM:UcsDomain", ["isLocal", "isPrimary"]);
    if (ucsDomainMatched != null)
        checkFlag = true;
} catch (e) {
    System.debug('Error! no valid object found ');
}
if (checkFlag == false) {
    throw "Failed to remove the blades. Reason : UCSM:UcsDomain Object not found";
}

for each(var j in SERVICE_PROFILE_ARRAY) {
    System.debug("Blade to be matched: " + j);
    var bladeToDelete = [];
	var allSP = GetSP();
    for each(var i in allSP) {
        if (i.Name.toUpperCase() == j.toUpperCase()) {
            System.debug("Deleting the matched blade " + i.Name +"...");
            bladeToDelete.push(i);
			UcsmActionUtils.disassociateServiceProfile(i);
			System.log("Successfully disassociated Service Profile.");
            var deletedSP = DeleteSP(bladeToDelete);
			
			if(deletedSP.length == 0) System.warn("No Service Profile was removed.");
			else System.log("Successfully removed Service Profile.");
            }
    }
}

function GetSP() {
    ucsDomain = ucsDomainMatched;
    parentMos = null;
    agentPolicyName = null;
    biosProfileName = null;
    bootPolicyName = null;
    configQualifier = null;
    configState = null;
    descr = null;
    dn = null;
    dynamicConPolicyName = null;
    extIPPoolName = null;
    extIPState = null;
    hostFwPolicyName = null;
    identPoolName = null;
    kvmMgmtPolicyName = null;
    localDiskPolicyName = null;
    maintPolicyName = null;
    mgmtAccessPolicyName = null;
    mgmtFwPolicyName = null;
    operBiosProfileName = null;
    operBootPolicyName = null;
    operDynamicConPolicyName = null;
    operExtIPPoolName = null;
    operHostFwPolicyName = null;
    operIdentPoolName = null;
    operKvmMgmtPolicyName = null;
    operLocalDiskPolicyName = null;
    operMaintPolicyName = null;
    operMgmtAccessPolicyName = null;
    operMgmtFwPolicyName = null;
    operPowerPolicyName = null;
    operPowerSyncPolicyName = null;
    operScrubPolicyName = null;
    operSolPolicyName = null;
    operSrcTemplName = null;
    operState = null;
    operStatsPolicyName = null;
    operVconProfileName = null;
    operVmediaPolicyName = null;
    owner = null;
    pnDn = null;
    policyLevel = null;
    policyOwner = null;
    powerPolicyName = null;
    powerSyncPolicyName = null;
    propAcl = null;
    resolveRemote = null;
    sacl = null;
    scrubPolicyName = null;
    solPolicyName = null;
    srcTemplName = null;
    statsPolicyName = null;
    svnicConfig = null;
    type = null;
    usrLbl = null;
    uuid = null;
    uuidSuffix = null;
    vconProfileName = null;
    vmediaPolicyName = null;
    limitScope = null;
    showMos = false;
    assignState = null;
    assocState = null;
    name = null;
    actionResult = System.getModule("com.cisco.ucs.mgr.ls").getServiceProfile(ucsDomain, parentMos, agentPolicyName, assignState, assocState, biosProfileName, bootPolicyName, configQualifier, configState, descr, dn, dynamicConPolicyName, extIPPoolName, extIPState, hostFwPolicyName, identPoolName, kvmMgmtPolicyName, localDiskPolicyName, maintPolicyName, mgmtAccessPolicyName, mgmtFwPolicyName, name, operBiosProfileName, operBootPolicyName, operDynamicConPolicyName, operExtIPPoolName, operHostFwPolicyName, operIdentPoolName, operKvmMgmtPolicyName, operLocalDiskPolicyName, operMaintPolicyName, operMgmtAccessPolicyName, operMgmtFwPolicyName, operPowerPolicyName, operPowerSyncPolicyName, operScrubPolicyName, operSolPolicyName, operSrcTemplName, operState, operStatsPolicyName, operVconProfileName, operVmediaPolicyName, owner, pnDn, policyLevel, policyOwner, powerPolicyName, powerSyncPolicyName, propAcl, resolveRemote, sacl, scrubPolicyName, solPolicyName, srcTemplName, statsPolicyName, svnicConfig, type, usrLbl, uuid, uuidSuffix, vconProfileName, vmediaPolicyName, limitScope, showMos);
    return actionResult;
}

function DeleteSP(mosToRemove) {
    ucsDomain = ucsDomainMatched;
    dn = null;
    showMos = false;
    actionResult = System.getModule("com.cisco.ucs.mgr.ls").removeServiceProfile(ucsDomain, mosToRemove, dn, showMos);
    return actionResult;
}
