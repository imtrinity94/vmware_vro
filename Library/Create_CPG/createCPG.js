/**
 * createCPG
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {string} cpgName - [object Object]
 * @param {string} domain - [object Object]
 * @param {string} raidType - [object Object]
 * @param {string} highAvailability - [object Object]
 * @param {string} diskType - [object Object]
 * @param {number} growthIncrementMiB - [object Object]
 * @param {number} growthLimitMiB - [object Object]
 * @param {number} growthWarningMiB - [object Object]
 * @param {number} setSize - [object Object]
 * @return {StoreServ:CPG} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.cpg").createCPG(connection,cpgName,domain,raidType,highAvailability,diskType,growthIncrementMiB,growthLimitMiB,growthWarningMiB,setSize) ;