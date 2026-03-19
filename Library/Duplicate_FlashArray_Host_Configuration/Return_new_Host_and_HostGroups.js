/**
 * Return new Host and HostGroups
 *
 * @param {Array/Array} hosts
 * @param {Array/Array} hgroup
 * @return {Array/PS:Host} hostsCreated
 * @return {Array/PS:HostGroup} hgroupCreated
 */
if(hosts != null){
	hostsCreated = new Array();
	var temp = new Array();
	for(var i=0; i< hosts.length ; i++){
		temp=hosts[i];
		if(temp!=null){
		for(var j=0; j< temp.length; j++){
			hostsCreated.push(temp[j]);
			}
		}
	}
}

if(hgroup != null){
	hgroupCreated = new Array();
	var temp = new Array();
	for(var i=0; i< hgroup.length ; i++){
		temp = hgroup[i];
		if(temp!=null){
			for(var j=0; j< temp.length; j++){
			hgroupCreated.push(hgroup[i][j]);
			}
		}
	}
}