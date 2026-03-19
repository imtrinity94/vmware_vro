/**
 * Initialize
 *
 * @param {string} vraUrl
 * @param {boolean} pgEnableCustomHostnaming
 * @return {string} attrVraUrl
 * @return {boolean} attrEnableCustomHostname
 * @return {boolean} attrAutodetectCustomHostname
 * @return {boolean} attrUseDefaultConditionalProperties
 */
attrVraUrl = vraUrl;

if (pgEnableCustomHostnaming) {
	attrEnableCustomHostname = true;
	attrAutodetectCustomHostname = true;
	attrUseDefaultConditionalProperties = true;
}
