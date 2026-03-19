/**
 * Get HostGroup of all Hosts
 *
 * @param {Array/PS:Host} flashArrayHosts
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {string} hgroupName
 * @return {PS:HostGroup} hostGroupObj
 */
for(i = 0; i < flashArrayHosts.length; i++)
{
	System.log("The host group for host " + flashArrayHosts[i].name + " is " + flashArrayHosts[i].hgroup);
}
var hgroupName = null
for(i = 0; i < flashArrayHosts.length; i++)
{
		if (String(flashArrayHosts[i].hgroup) == "__NULL__")
		{
			var hgroupError = "The host named " + flashArrayHosts[i].name + " is not in a host group";
			System.error(hgroupError);
			throw (hgroupError);
		}
		if (i == 0)
		{
				hgroupName = flashArrayHosts[i].hgroup;
		}
		if (hgroupName !== flashArrayHosts[i].hgroup && i !== 0)
		{
			var hgroupError = "The hosts are spread across more than one host group on the FlashArray. Please make sure that the host group corresponds to the cluster. Cannot continue."
			System.error(hgroupError);
			throw (hgroupError);
		}
}
System.log("The volume will be added to the host group named " + hgroupName);
hostGroupObj = System.getModule("com.purestorage.flasharray.hostgroup").getSpecificFlashArrayHostGroup(hgroupName,flashArrayConnection) ;
System.debug("host group object " + hostGroupObj);
