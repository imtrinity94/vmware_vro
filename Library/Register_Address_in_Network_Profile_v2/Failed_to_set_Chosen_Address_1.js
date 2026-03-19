/**
 * Failed to set Chosen Address
 *
 * @param {string} ip_address
 */
var errorCode = "FAILED to Assign Address";
System.error("FATAL: Failed to assign the chosen address (" + ip_address + "). The address was not found as available.");
throw errorCode