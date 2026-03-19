/**
 * Determine Hostname
 *
 * @param {boolean} existingServer - [object Object]
 * @param {string} newHostname - [object Object]
 * @param {CS:SourceRootNode} sourceNode - [object Object]
 * @return {string} hostname - [object Object]
 */
if (existingServer) {
	// Registering existing server.
	hostname = sourceNode.displayName;
} else {
	hostname = newHostname;
}