/**
 * Remove REST host
 *
 * @param {REST:RESTHost} host
 * @return {string} errorCode
 * @return {rest:RESTHost} removedRestHost
 */
removedRestHost = RESTHostManager.removeHost(host.id);

System.log("REST host removed: " + removedRestHost);