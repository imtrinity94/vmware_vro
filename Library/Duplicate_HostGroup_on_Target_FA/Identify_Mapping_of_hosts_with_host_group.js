/**
 * Identify Mapping of hosts with host group
 *
 * @param {PS:FlashArrayConnection} targetFAConn
 * @param {Array/PS:Host} hosts
 * @param {PS:HostGroup} hgSource
 * @return {Array/PS:Host} hostList
 * @return {string} hgName
 */
if(!hosts){
System.error("Host Required.");
}
if(!targetFAConn){
System.error("Target flash array connection Required.");
}
if(!hgSource){
System.error("Source Host group required.");
}
var session=PSSessionManager.getSession(targetFAConn);

hostList=new Array();

hgName=hgSource.name;

for(var i=0; i<hosts.length; i++){
var name=hosts[i].name;
hostList.push(PSHostManager.getHost(name , session));
}