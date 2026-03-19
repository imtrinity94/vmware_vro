/**
 * Modify volume
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} volumeName
 * @param {StoreServ:CPG} snapCPG
 * @param {number} ssSpcAllocWarningPct
 * @param {number} ssSpcAllocLimitPct
 * @param {number} usrSpcAllocWarningPct
 * @param {number} usrSpcAllocLimitPct
 * @param {number} expirationHours
 * @param {number} retentionHours
 * @param {boolean} rmSsSpcAllocWarning
 * @param {boolean} rmUsrSpcAllocWarning
 * @param {boolean} rmExpTime
 * @param {boolean} rmSsSpcAllocLimit
 * @param {boolean} rmUsrSpcAllocLimit
 * @return {StoreServ:Volume} volume
 */

var out = connection.updateVolume(volumeName,snapCPG,
				ssSpcAllocWarningPct, ssSpcAllocLimitPct, usrSpcAllocWarningPct, 
				usrSpcAllocLimitPct, expirationHours, retentionHours, rmSsSpcAllocWarning, 
				rmUsrSpcAllocWarning, rmExpTime, rmSsSpcAllocLimit, rmUsrSpcAllocLimit);

if(out != undefined){
	System.log("Modify Volume operation result : Success");
	System.log("Modify Volume operation detailed result: "+"Volume name: "+out.name);
}
volume = out;
