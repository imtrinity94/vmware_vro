/**
 * Add schema to REST host
 *
 * @param {REST:RESTHost} host
 * @param {boolean} use_url
 * @param {string} url
 * @param {string} text
 * @return {Array/string} namespaces
 */
if (use_url) {
  namespaces = host.addSchemaFromUrl(url);
} else {
  namespaces = host.addSchemaFromXmlString(text);
}

RESTHostManager.updateHost(host);