/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} authType
 * @param {string} samlEntityType
 * @param {string} authProfileName
 * @param {string} org_name
 * @param {string} org_display_name
 * @param {string} org_url
 * @param {string} tech_contact_name
 * @param {string} tech_contact_email
 * @param {string} saml_fqdn
 * @param {string} ldapPort
 * @param {string} user_search_scope
 * @param {string} security_mode
 * @param {string} group_member_attribute
 * @param {string} group_search_scope
 * @param {boolean} group_member_is_full_dn
 * @param {string} group_filter
 * @param {boolean} ignore_referrals
 * @param {string} admin_bind_dn
 * @param {string} user_search_dn
 * @param {string} group_search_dn
 * @param {SecureString} admin_bind_password
 * @param {string} user_id_attribute
 * @param {Array/string} ldapServers
 * @param {string} base_dn
 * @param {string} metadata
 * @param {Array/string} groupMapping
 * @param {Array/string} userMapping
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").remoteAuthenticationConfiguration(aviVroClient,authType,samlEntityType,authProfileName,org_name,org_display_name,org_url,tech_contact_name,tech_contact_email,saml_fqdn,ldapPort,user_search_scope,security_mode,group_member_attribute,group_search_scope,group_member_is_full_dn,group_filter,ignore_referrals,admin_bind_dn,user_search_dn,group_search_dn,admin_bind_password,user_id_attribute,ldapServers,base_dn,metadata,groupMapping,userMapping);
