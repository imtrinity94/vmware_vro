//in vCD 9.1, RoleAttributeName is missing from the vRO class properties. However, these is still a way 
You will need to generate an object, convert it to xml then execute a rest query against the organization to update; you can build the xml from an object, then post against the correct url.

// this is quick and dirty to illustrate, expectations are you provide the organization, find the uri, retrieve the saml metadata etc

 

var orgFederationSettings = new VclOrgFederationSettings

 

System.debug(vclAdminOrg.settings.orgFederationSettings.roleAttributeName)

 

orgFederationSettings.enabled = true

 

orgFederationSettings.sAMLMetadata = "XML file goes here";

 

orgFederationSettings.certificateExpiration = null

orgFederationSettings.roleAttributeName = 'test234'

orgFederationSettings.samlSPEntityId = 'test'

orgFederationSettings.samlSPKeyAndCertificateChain = null

 

System.debug(vclAdminOrg.settings.orgFederationSettings.href)

 

vclHost.executeRestQueries(null,vclAdminOrg.settings.orgFederationSettings.href,"application/vnd.vmware.admin.organizationFederationSettings+xml","PUT",orgFederationSettings.toXml()) // change to post if creating the org federation settings

 

vclAdminOrg.updateInternalState()

 

System.debug(vclAdminOrg.settings.orgFederationSettings.roleAttributeName)

 

//This methodology works for basically anything where the data set is missing from the object implementation, you can build the body based on the object and merely post it.

 
