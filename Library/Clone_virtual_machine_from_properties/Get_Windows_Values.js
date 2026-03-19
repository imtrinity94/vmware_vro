/**
 * Get Windows Values
 *
 * @param {Properties} props
 * @return {boolean} winDoSysprep
 * @return {string} winClientName
 * @return {string} winProductId
 * @return {string} winJoinDomain
 * @return {string} winJoinWorkgroup
 * @return {Credential} winDomainAdmin
 * @return {string} winDomainAdminUsername
 * @return {SecureString} winDomainAdminPassword
 * @return {VC:CustomizationLicenseDataMode} winLicenseMode
 * @return {number} winLicenseUsers
 * @return {string} winNewAdminPassword
 * @return {Enums:MSTimeZone} winTimezone
 * @return {string} winFullName
 * @return {string} winOrgName
 * @return {boolean} isWindows
 */
if (props.get("winDoSysprep") == null)
	winDoSysprep = true;
else 
	winDoSysprep = props.get("winDoSysprep");
System.debug("Doing Sysprep: " + winDoSysprep);
	
winClientName = props.get("winClientName");
winProductId = props.get("winProductId");
winJoinDomain = props.get("winJoinDomain");
winJoinWorkgroup = props.get("winJoinWorkgroup");
winDomainAdmin = props.get("winDomainAdmin");
winDomainAdminUsername = props.get("winDomainAdminUsername");
winDomainAdminPassword = props.get("winDomainAdminPassword");
winLicenseMode = props.get("winLicenseMode");
winLicenseUsers = props.get("winLicenseUsers");
winNewAdminPassword = props.get("winNewAdminPassword");
winTimezone = props.get("winTimezone");
winFullName = props.get("winFullName");
winOrgName = props.get("winOrgName");


isWindows = true;