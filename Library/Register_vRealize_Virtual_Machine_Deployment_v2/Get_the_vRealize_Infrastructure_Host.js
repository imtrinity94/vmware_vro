/**
 * Get the vRealize Infrastructure Host
 *
 * @param {vCAC:VCACHost} vRealizeIaasHost
 * @return {vCAC:VCACHost} iaasHost
 */
if(vRealizeIaasHost){
	iaasHost = vRealizeIaasHost;
}
else {
	iaasHost = System.getModule("com.cohesity.plugin.vmware.vcac").getIaasHostForEnvironment() ;
}