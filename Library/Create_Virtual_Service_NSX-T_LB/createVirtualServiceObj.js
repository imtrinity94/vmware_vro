/**
 * createVirtualServiceObj
 *
 * @param {string} Name - [object Object]
 * @param {string} ServerCloud - [object Object]
 * @param {string} Tenant - [object Object]
 * @param {string} ApplicationProfile - [object Object]
 * @param {number} servicePort - [object Object]
 * @param {string} poolName - [object Object]
 * @param {string} vsVipName - [object Object]
 * @param {boolean} CreateSSL
 * @param {string} clientStringRef
 * @param {boolean} logAllClientHeaders
 * @param {boolean} trafficEnabled
 * @param {string} nslThrottle
 * @param {string} poolgroupName
 * @param {number} metricsRealtimeUpdateDuration
 * @param {string} excludeURL
 * @param {string} SSLCertificate
 * @param {boolean} scaleoutEcmp
 * @param {boolean} vsVIP
 * @param {string} description
 * @param {boolean} enableRhiSnat
 * @param {string} nslduration
 * @param {boolean} enableAutogw
 * @param {boolean} useBridgeIpAsVip
 * @param {boolean} nonSignificantLogs
 * @param {boolean} closeClientConfigUpdate
 * @param {string} clientIpAddr
 * @param {boolean} enabledClientLog
 * @param {boolean} SSLCert
 * @param {boolean} metricsRealtimeUpdate
 * @param {string} clientInsights
 * @param {number} udfLogThrottle
 * @param {boolean} ignPoolNetReach
 * @param {string} serviceEngine
 * @param {boolean} addClientLogFliter
 * @param {string} CertName
 * @param {number} significantLogThrottle
 * @param {string} includeURL
 * @param {string} existingVIP
 * @param {boolean} enableRhi
 * @param {boolean} allowInvalidClientCert
 * @param {boolean} poolOrPoolgroup
 * @param {string} analyticsProfile
 * @param {number} clientDuration
 * @param {boolean} useVipAsSnat
 * @param {boolean} removeListeningPortOnVsDown
 * @param {number} maxCpsPerClient
 * @param {string} network_profile
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} virtual_service_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createVirtualServiceObj(Name,poolgroupName,ServerCloud,Tenant,ApplicationProfile,servicePort,SSLCertificate,SSLCert,CertName,CreateSSL,serviceEngine,poolOrPoolgroup,poolName,vsVIP,existingVIP,allowInvalidClientCert,closeClientConfigUpdate,description,enableAutogw,enableRhi,enableRhiSnat,ignPoolNetReach,removeListeningPortOnVsDown,scaleoutEcmp,clientIpAddr,includeURL,excludeURL,addClientLogFliter,enabledClientLog,clientStringRef,clientDuration,logAllClientHeaders,analyticsProfile,clientInsights,significantLogThrottle,udfLogThrottle,nonSignificantLogs,nslduration,nslThrottle,metricsRealtimeUpdate,metricsRealtimeUpdateDuration,maxCpsPerClient,trafficEnabled,useBridgeIpAsVip,useVipAsSnat,vsVipName,workflowRuntime,network_profile, virtual_service_uuid) ;