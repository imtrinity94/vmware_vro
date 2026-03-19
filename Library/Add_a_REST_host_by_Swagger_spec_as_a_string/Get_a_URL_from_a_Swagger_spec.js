/**
 * Get a URL from a Swagger spec
 *
 * @param {string} preferredCommunicationProtocol
 * @param {string} basePath
 * @param {string} host
 * @param {string} swaggerSpecString
 * @param {string} swaggerVersion
 * @param {string} preferredUrl
 * @param {string} swaggerVersionGlobal
 * @return {string} restHostUrl
 * @return {string} swaggerVersionGlobal
 */
if(!swaggerVersion) {
	swaggerVersion = "Swagger 2.x"
}

swaggerVersionGlobal = swaggerVersion

if (swaggerVersionGlobal == "OpenAPI 3.x") {
	restHostUrl = RESTHostManager.getOpenApiServiceUrl(swaggerSpecString, preferredUrl);
} else if (swaggerVersionGlobal == "Swagger 2.x") {
	restHostUrl = RESTHostManager.getSwaggerServiceUrl(swaggerSpecString, host, basePath, preferredCommunicationProtocol);
}

Server.log(restHostUrl);