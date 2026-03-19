/**
 * Updates SAML Entity ID and Role Attribute Name in vCloud Director Organization Federation Settings.
 * This action demonstrates using REST queries to update properties missing from the standard vRO class implementation.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:Host} vclHost The vCloud host object.
 * @param {vCloud:AdminOrganization} vclAdminOrg The Admin Organization object to update.
 * @param {string} samlMetadata The SAML metadata XML string.
 * @param {string} roleAttributeName The role attribute name (e.g., 'test234').
 * @param {string} samlSPEntityId The SAML SP Entity ID (e.g., 'test').
 * @returns {void}
 */

System.debug("Current Role Attribute Name: " + vclAdminOrg.settings.orgFederationSettings.roleAttributeName);

// Initialize a new Federation Settings object to hold updates
var orgFederationSettings = new VclOrgFederationSettings();

orgFederationSettings.enabled = true;
orgFederationSettings.sAMLMetadata = samlMetadata;
orgFederationSettings.certificateExpiration = null;
orgFederationSettings.roleAttributeName = roleAttributeName;
orgFederationSettings.samlSPEntityId = samlSPEntityId;
orgFederationSettings.samlSPKeyAndCertificateChain = null;

var settingsUrl = vclAdminOrg.settings.orgFederationSettings.href;
System.log("Updating SAML settings at URL: " + settingsUrl);

// Execute PUT request with the XML representation of the settings
vclHost.executeRestQueries(
    null,
    settingsUrl,
    "application/vnd.vmware.admin.organizationFederationSettings+xml",
    "PUT",
    orgFederationSettings.toXml()
);

// Refresh internal state of the organization
vclAdminOrg.updateInternalState();

System.debug("Updated Role Attribute Name: " + vclAdminOrg.settings.orgFederationSettings.roleAttributeName);
