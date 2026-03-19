/**
 * Prepare
 *
 * @param {CS:CohesityConnection} item
 * @param {string} endpointUrl
 * @param {string} newCohesityAddress - [object Object]
 * @return {string} currentName
 * @return {string} endpointUrl
 */
currentName = item.name;
// Secure endpoint url.
endpointUrl = "https://" + newCohesityAddress;