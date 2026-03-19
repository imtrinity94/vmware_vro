/**
 * Updates SAML Entity ID and Role Attribute Name in vCloud Director Organization Federation Settings.
 * This action demonstrates using REST queries to update properties missing from the standard vRO class implementation.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:Host} vcloudHostHandle - The vCloud host object.
 * @param {vCloud:AdminOrganization} vcloudAdminOrg - The Admin Organization object to update.
 * @param {string} rawSamlMetadata - The SAML metadata XML string.
 * @param {string} targetRoleAttributeName - The role attribute name (e.g., 'test234').
 * @param {string} targetSamlSPEntityId - The SAML SP Entity ID (e.g., 'test').
 * @returns {void}
 */

if (!vcloudAdminOrg || !vcloudAdminOrg.settings || !vcloudAdminOrg.settings.orgFederationSettings) {
    throw "Admin Organization federation settings are unavailable for update.";
}

var currentAttribName = vcloudAdminOrg.settings.orgFederationSettings.roleAttributeName;
System.debug("Pre-update Role Attribute Name: " + currentAttribName);

// Construct a new Federation Settings object for the PUT payload
var federationUpdateObj = new VclOrgFederationSettings();

federationUpdateObj.enabled = true;
federationUpdateObj.sAMLMetadata = rawSamlMetadata;
federationUpdateObj.certificateExpiration = null;
federationUpdateObj.roleAttributeName = targetRoleAttributeName;
federationUpdateObj.samlSPEntityId = targetSamlSPEntityId;
federationUpdateObj.samlSPKeyAndCertificateChain = null;

var settingsEndpointUrl = vcloudAdminOrg.settings.orgFederationSettings.href;
System.log("Dispatching updated SAML configuration via REST to: " + settingsEndpointUrl);

// Execute low-level REST query to bypass plugin limitations
try {
    vcloudHostHandle.executeRestQueries(
        null,
        settingsEndpointUrl,
        "application/vnd.vmware.admin.organizationFederationSettings+xml",
        "PUT",
        federationUpdateObj.toXml()
    );
    
    // Notify plugin to refresh its cached view of the organization settings
    vcloudAdminOrg.updateInternalState();
} catch (restEx) {
    System.error("Failed to update SAML Federation settings for " + vcloudAdminOrg.name + ". Error: " + restEx);
    throw restEx;
}

var verifiedAttribName = vcloudAdminOrg.settings.orgFederationSettings.roleAttributeName;
System.log("Synchronization complete. Verified Role Attribute Name: " + verifiedAttribName);

return null;
