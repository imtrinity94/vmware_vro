/**
 * Validate inputs
 *
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint
 */
if (Endpoint == null || Endpoint == undefined) {
	throw "IPAM endpoint is not initialized."
}
