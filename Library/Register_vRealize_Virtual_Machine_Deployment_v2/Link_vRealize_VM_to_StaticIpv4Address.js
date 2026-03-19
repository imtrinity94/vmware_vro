/**
 * Link vRealize VM to StaticIpv4Address
 *
 * @param {vCAC:VirtualMachine} vcacVM
 * @param {vCAC:Entity} entity
 * @param {vCAC:VCACHost} host
 * @return {vCAC:Entity} ipAddress
 */
System.debug("BEGIN: Link vRealize VM to StaticIpv4Address");
var entitySetName = "StaticIPv4Addresses";
var property = new Properties();
property.put("StaticIPv4AddressState",0);
property.put("LastModifiedDate", new Date());

var links = new Properties();
links.put("VirtualMachine",vcacVM.getEntity());

ipAddress = System.getModule("com.cohesity.plugin.vmware.vcac").updateVcacEntityProperty(host, entity, entitySetName, "ID", property, links) ;
System.debug("END: Link vRealize VM to StaticIpv4Address");