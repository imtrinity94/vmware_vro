/**
 * createVirtualServiceObj
 *
 * @param {boolean} addClientLogFliter
 * @param {boolean} allowInvalidClientCert
 * @param {string} analyticsProfile
 * @param {string} ApplicationProfile - [object Object]
 * @param {string} CertName
 * @param {number} clientDuration
 * @param {string} clientInsights
 * @param {string} clientIpAddr
 * @param {string} clientStringRef
 * @param {boolean} closeClientConfigUpdate
 * @param {boolean} CreateSSL
 * @param {string} description
 * @param {boolean} enableAutogw
 * @param {boolean} enabledClientLog
 * @param {boolean} enableRhi
 * @param {boolean} enableRhiSnat
 * @param {string} excludeURL
 * @param {string} existingVIP
 * @param {boolean} ignPoolNetReach
 * @param {string} includeURL
 * @param {boolean} logAllClientHeaders
 * @param {number} maxCpsPerClient
 * @param {boolean} metricsRealtimeUpdate
 * @param {number} metricsRealtimeUpdateDuration
 * @param {string} Name - [object Object]
 * @param {string} network_profile
 * @param {boolean} nonSignificantLogs
 * @param {string} nslduration
 * @param {string} nslThrottle
 * @param {string} poolgroupName
 * @param {string} poolName - [object Object]
 * @param {boolean} poolOrPoolgroup
 * @param {boolean} removeListeningPortOnVsDown
 * @param {boolean} scaleoutEcmp
 * @param {string} ServerCloud - [object Object]
 * @param {string} serviceEngine
 * @param {number} servicePort - [object Object]
 * @param {number} significantLogThrottle
 * @param {boolean} SSLCert
 * @param {string} SSLCertificate
 * @param {string} Tenant - [object Object]
 * @param {boolean} trafficEnabled
 * @param {number} udfLogThrottle
 * @param {boolean} useBridgeIpAsVip
 * @param {boolean} useVipAsSnat
 * @param {boolean} vsVIP
 * @param {string} vsVipName - [object Object]
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} virtual_service_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createVirtualServiceObj(Name,poolgroupName,ServerCloud,Tenant,ApplicationProfile,servicePort,SSLCertificate,SSLCert,CertName,CreateSSL,serviceEngine,poolOrPoolgroup,poolName,vsVIP,existingVIP,allowInvalidClientCert,closeClientConfigUpdate,description,enableAutogw,enableRhi,enableRhiSnat,ignPoolNetReach,removeListeningPortOnVsDown,scaleoutEcmp,clientIpAddr,includeURL,excludeURL,addClientLogFliter,enabledClientLog,clientStringRef,clientDuration,logAllClientHeaders,analyticsProfile,clientInsights,significantLogThrottle,udfLogThrottle,nonSignificantLogs,nslduration,nslThrottle,metricsRealtimeUpdate,metricsRealtimeUpdateDuration,maxCpsPerClient,trafficEnabled,useBridgeIpAsVip,useVipAsSnat,vsVipName,workflowRuntime,network_profile, virtual_service_uuid) ;