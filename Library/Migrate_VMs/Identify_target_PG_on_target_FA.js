/**
 * Identify target PG on target FA
 *
 * @param {PS:FlashArrayConnection} targetFAConnection
 * @param {Array/PS:ProtectionGroup} volumePgList
 * @return {Array/PS:ProtectionGroup} targetPGs
 */
var targetPGs = new Array();
var targetSession = PSSessionManager.getSession(targetFAConnection);
for(var i = 0; i < volumePgList.length; i++){
	var pg_FAConnection = PSProtectionGroupManager.getConnectionByProtectionGroup(volumePgList[i]);
	var localFA_Object = PSFlashArrayManager.getFlashArray(pg_FAConnection);
	var targetPGName = localFA_Object.name + ":" + volumePgList[i].name; // PGs will be created on rFA with this naming convention
	System.debug("Target PG name : " + targetPGName);
	var targetPG = PSProtectionGroupManager.getProtectionGroup(targetPGName,targetSession);
	targetPGs.push(targetPG);
}