/**
 * Reserve chosen IP Address
 *
 * @param {vCAC:Entity} entity
 * @param {vCAC:VCACHost} host
 * @return {vCAC:Entity} ipAddress
 */
System.debug("BEGIN: Reserve chosen IP Address");
System.log("Marking Address " + entity.getProperty("IPv4Address") + " as Allocated.");
var entitySetName = "StaticIPv4Addresses";
var property = new Properties();
property.put("StaticIPv4AddressState",0);
property.put("LastModifiedDate", new Date());

ipAddress = System.getModule("com.cohesity.plugin.vmware.vcac").updateVcacEntityProperty(host, entity, entitySetName, "ID", property) ;
System.debug("END: Reserve chosen IP Address");