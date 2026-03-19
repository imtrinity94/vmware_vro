/**
 * createPoolObj
 *
 * @param {Array/string} PoolServers - [object Object]
 * @param {boolean} enablePool - [object Object]
 * @param {boolean} CreateHealthMonitor - [object Object]
 * @param {string} poolName - [object Object]
 * @param {string} defaultServerPort - [object Object]
 * @param {string} loadBalancerAlgo - [object Object]
 * @param {string} serverType - [object Object]
 * @param {string} lbConsistentHash - [object Object]
 * @param {string} lbCustomHeaderName - [object Object]
 * @param {string} ServerCloud - [object Object]
 * @param {string} Tenant - [object Object]
 * @param {string} HealthMonitorName - [object Object]
 * @param {Array/string} healthMonitor - [object Object]
 * @param {string} Version - [object Object]
 * @param {boolean} activePassiveHM - [object Object]
 * @param {boolean} capacityEstimation - [object Object]
 * @param {number} capacityEstimationThresh - [object Object]
 * @param {string} cloudConfigCksum - [object Object]
 * @param {boolean} deleteServerRefresh - [object Object]
 * @param {number} gracefulDisableTimeout - [object Object]
 * @param {boolean} hostCheckEnabled - [object Object]
 * @param {boolean} lookupServerByName - [object Object]
 * @param {boolean} rewriteHostHeaderServerName - [object Object]
 * @param {number} maxConcurrentConnectionsPerServer - [object Object]
 * @param {string} domainName - [object Object]
 * @param {number} fewestTasksFeedbackDelay - [object Object]
 * @param {number} connectionRampDuration - [object Object]
 * @param {number} upstreamConnpoolConnIdleTmo - [object Object]
 * @param {number} upstreamConnpoolConnLifeTmo - [object Object]
 * @param {number} upstreamConnpoolConnMaxReuse - [object Object]
 * @param {number} upstreamConnpoolServerMaxCache - [object Object]
 * @param {boolean} requestQueueEnabled - [object Object]
 * @param {boolean} useServicePort - [object Object]
 * @param {boolean} sniEnabled - [object Object]
 * @param {number} serverTimeout - [object Object]
 * @param {boolean} enableRealtimeMetrics - [object Object]
 * @param {string} statusCode - [object Object]
 * @param {string} failActionURL - [object Object]
 * @param {string} statusProtocol - [object Object]
 * @param {string} failActiontype - [object Object]
 * @param {string} PersistenceProfileRef
 * @param {string} port
 * @param {number} ratio
 * @param {boolean} addPersistenceProfileRef
 * @param {string} tier1_lr
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} pool_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createPoolObj(PoolServers,enablePool,CreateHealthMonitor,poolName,defaultServerPort,loadBalancerAlgo,serverType,lbConsistentHash,lbCustomHeaderName,ServerCloud,Tenant,HealthMonitorName,healthMonitor,Version,activePassiveHM,capacityEstimation,capacityEstimationThresh,cloudConfigCksum,deleteServerRefresh,gracefulDisableTimeout,hostCheckEnabled,lookupServerByName,rewriteHostHeaderServerName,maxConcurrentConnectionsPerServer,domainName,fewestTasksFeedbackDelay,connectionRampDuration,upstreamConnpoolConnIdleTmo,upstreamConnpoolConnLifeTmo,upstreamConnpoolConnMaxReuse,upstreamConnpoolServerMaxCache,requestQueueEnabled,useServicePort,sniEnabled,serverTimeout,enableRealtimeMetrics,statusCode,failActionURL,statusProtocol,failActiontype,workflowRuntime,PersistenceProfileRef,ratio,port,addPersistenceProfileRef,tier1_lr, pool_uuid) ;