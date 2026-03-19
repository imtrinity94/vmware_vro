/**
 * Insert a new Address into the Pool
 *
 * @param {Properties} StaticIPv4AddressProps
 * @param {vCAC:VCACHost} host
 * @param {number} attempts
 * @return {number} attempts
 */
System.debug("BEGIN: Create new vRealize StaticIPv4Address Entity");
var modelName = 'ManagementModelEntities.svc';
var entitySetName = 'StaticIPv4Addresses';
var links = StaticIPv4AddressProps.links;
var headers = null;

delete StaticIPv4AddressProps.links;

var entityStaticIPv4Address = vCACEntityManager.createModelEntity(host.id, modelName, entitySetName, StaticIPv4AddressProps, links, headers);

System.debug("END: Create new vRealize StaticIPv4Address Entity");
attempts++;