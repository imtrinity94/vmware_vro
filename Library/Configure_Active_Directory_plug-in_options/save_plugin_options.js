/**
 * save plugin options
 *
 * @param {AD:AdHost} defaultAdServer
 * @param {boolean} useDefaultServer
 * @param {number} searchSizeLimit
 * @param {number} searchSizeLimitPerServer
 */
var prop = {}
if (useDefaultServer==false || defaultAdServer == null) {
	prop["DEFAULT_CFG_ID"] = '';
} else {
	prop["DEFAULT_CFG_ID"] = defaultAdServer.hostConfiguration.id;
}

prop["SEARCH_SIZE_LIMIT"] = searchSizeLimit.toString();
prop["SEARCH_SIZE_LIMIT_PER_SERVER"] = searchSizeLimitPerServer.toString();

ConfigurationManager.savePluginOptions(prop)