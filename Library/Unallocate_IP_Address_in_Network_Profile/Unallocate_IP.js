/**
 * Unallocate IP
 *
 * @param {vCAC:VCACHost} vcacHost
 * @param {vCAC:Entity} ipEntity
 * @return {vCAC:Entity} ipAddress
 */
if (!ipEntity) {
	throw "IP not found in IPAM.";
}

System.debug("BEGIN: Unallocate IP Address");
var entitySetName = "StaticIPv4Addresses";
var property = new Properties();
property.put("StaticIPv4AddressState",1);
property.put("LastModifiedDate", new Date());

var links = new Properties();
links.put("VirtualMachine",[]);

ipAddress = System.getModule("com.cohesity.plugin.vmware.vcac").updateVcacEntityProperty(vcacHost, ipEntity, entitySetName, "ID", property, links) ;
System.debug("END: Unallocate IP Address");