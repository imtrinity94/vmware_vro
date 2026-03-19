/**
 * List organizations
 *
 * @param {REST:RESTHost} vlcoud_host
 * @return {boolean} success
 * @return {string} org_list
 */
var response = vlcoud_host.createRequest("GET", "/org", null).execute();

org_list = response.contentAsString;