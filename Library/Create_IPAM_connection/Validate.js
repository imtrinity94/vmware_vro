/**
 * Validate
 *
 * @param {string} id
 * @param {string} url
 * @param {string} username
 * @param {SecureString} password
 * @param {number} priority
 * @param {InfobloxIPAM:IpamApiType} apiType
 */
if (!id) {
	throw new "Invalid IPAM endpoint: ID is not initialized."
}

if (!url) {
	throw new "Invalid IPAM endpoint: URL is not initialized."
}

if (!username) {
	throw new "Invalid IPAM endpoint: username is not initialized."
}

if (!password) {
	throw new "Invalid IPAM endpoint: password is not initialized."
}

if (isNaN(priority)) {
	throw new "Invalid IPAM endpoint: priotity [" + priority + "] is invalid."
}

if (apiType == null || apiType == undefined) {
	throw new "Invalid IPAM endpoint: API type is not initialized."
}
