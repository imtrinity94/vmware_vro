/**
 * Find the result
 *
 * @param {string} dvPortGroupName
 * @param {VC:VmwareDistributedVirtualSwitch} dvSwitch
 * @return {VC:DistributedVirtualPortgroup} dvPortgroup
 */
for each (portG in dvSwitch.portgroup) {
	if ( portG.config.name == dvPortGroupName ) {
		dvPortgroup = portG;
		break;
	}
}