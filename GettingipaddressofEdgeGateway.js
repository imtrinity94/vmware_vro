System.log("Interrogating Gateway: "+gateway.name);  
System.log("Description: "+gateway.description);  
System.log("href: "+gateway.href);  
System.log("ID: "+gateway.id);  
System.log("operationKey: "+gateway.operationKey);  
System.log("otherAttributes: "+displayMap(gateway.otherAttributes)); // VclMap  
// Nees to process here...  
  
System.log("parent: "+gateway.parent.name); // Returns Org vDC  
System.log("Status: "+gateway.status);  
if (gateway.tasks != null){  
    var gwTasks = gateway.tasks.getTasks();  
    System.log("---- Tasks in progress: "+gwTasks.length);  
    for each (gwTask in gwTasks){  
        System.log("-- name: "+gwTask.name+ " --");  
        System.log("status: "+gwTask.status); // queued, preRunning, running, success, error, canceled, aborted  
        if (gwTask.status == "error"){  
            System.log("Error: ");  
            var gwTaskError = gwTask.error;  
            System.log("majorErrorCode: "+gwTaskError.majorErrorCode);  
            System.log("minorErrorCode: "+gwTaskError.minorErrorCode);  
            System.log("vendorSpecificErrorCode: "+gwTaskError.vendorSpecificErrorCode);  
            System.log("message: "+gwTaskError.message);  
            //System.log("stackTrace: "+gwTaskError.stackTrace);  
            System.log("----");  
        }  
        System.log("type: "+gwTask.type);  
        System.log("description: "+gwTask.description);  
        System.log("startTime: "+gwTask.startTime.toGregorianCalendar());  
        System.log("expiryTime: "+gwTask.expiryTime.toGregorianCalendar());  
        System.log("endTime: "+gwTask.endTime.toGregorianCalendar());  
        System.log("progress: "+gwTask.progress+"%");  
        System.log("owner: "+gwTask.owner.name);  
        System.log("");  
        // There are many more properties for VclTask object - feel free to add more as desired  
    }  
    System.log("---- End Tasks in progress ----");  
}  
System.log("Type: "+gateway.type);  
System.log("vCloudExtension: "+displayVcloudExtension(gateway.vCloudExtension)); // VclObjectList -- related obj types: VclVCloudExtension  
System.log("XML: \n"+gateway.toXml()); // Returns null  
  
System.log("========== Configuration ==========");  
var gwConfig = gateway.configuration;  
System.log("backwardCompatibilityMode: "+gwConfig.backwardCompatibilityMode); // boolean  
  
System.log("gatewayBackingConfig: "+gwConfig.gatewayBackingConfig); // string: compact/full  
if (gwConfig.gatewayInterfaces != null && gwConfig.gatewayInterfaces.gatewayInterface != null){  
    var gwInterfaces = gwConfig.gatewayInterfaces.gatewayInterface.enumerate(); // VclGatewayInterfaces  
    System.log("====== Gateway Interfaces ======");  
    for each (gwi in gwInterfaces){  
        System.log("==== Gateway Interface: "+gwi.name);  
        System.log("displayName: "+gwi.displayName);  
        System.log("network: "+gwi.network.name); // VclReference  
        System.log("applyRateLimit: "+gwi.applyRateLimit);  
        System.log("inRateLimit: "+gwi.inRateLimit);  
        System.log("outRateLimit: "+gwi.outRateLimit);  
        System.log("interfaceType: "+gwi.interfaceType);  
        if(gwi.subnetParticipation != null){ // VclObjectList -- related obj types: VclSubnetParticipation  
            System.log("=== Subnet Participation: ");  
            var gwiSubnets = gwi.subnetParticipation.enumerate();  
            for each (gwiSubnet in gwiSubnets){  
                System.log("gateway: "+gwiSubnet.gateway);  
                System.log("ipAddress: "+gwiSubnet.ipAddress);  
                System.log("netmask: "+gwiSubnet.netmask);  
                if (gwiSubnet.ipRanges != null){  
                    var ipRanges = gwiSubnet.ipRanges.ipRange.enumerate();  
                    for each (range in ipRanges){  
                        System.log("ipRange: "+range.startAddress+"-"+range.endAddress);  
                    }  
                }  
                System.log("");  
            }  
        }  
        System.log("useForDefaultRoute: "+gwi.useForDefaultRoute);  
        System.log("otherAttributes: "+displayMap(gwi.otherAttributes));  
        System.log("vCloudExtension: "+displayVcloudExtension(gwi.vCloudExtension));  
        System.log("XML: "+gwi.toXml());  
        System.log("");  
    }  
}  
System.log("haEnabled: "+gwConfig.haEnabled); // boolean  
System.log("otherAttributes: "+displayMap(gwConfig.otherAttributes)); //VclMap  
System.log("useDefaultRouteForDnsRelay: "+gwConfig.useDefaultRouteForDnsRelay); // boolean  
System.log("vCloudExtension: "+displayVcloudExtension(gwConfig.vCloudExtension));  
System.log("XML: \n"+gwConfig.toXml());  
  
  
var gwFeatures = gwConfig.edgeGatewayServiceConfiguration; // VclGatewayFeatures  
var serviceSet = gwFeatures.networkService;  
System.log("====== Gateway Services Available: "+serviceSet.size()+" ======");  
  
// Check Services for VclNatService  
var natServices = serviceSet.find(new VclNatService());  
if (natServices != null && natServices.length > 0){  
    System.log("");  
    System.log("==== NAT services found: "+natServices.length+" ====");  
    for each (natServices in natServices){  
        System.log("----- NEED TO CODE THIS -----");  
    }  
}  
  
// Check Services for VclIpsecVpnService  
var ipsecVpnServices = serviceSet.find(new VclIpsecVpnService());  
if (ipsecVpnServices != null && ipsecVpnServices.length > 0){  
    System.log("");  
    System.log("==== IPSEC VPN services found: "+ipsecVpnServices.length+" ====");  
    for each (ipsecVpnService in ipsecVpnServices){  
        System.log("----- NEED TO CODE THIS -----");  
    }  
}  
  
// Check Services for VclFirewallService  
var fwServices = serviceSet.find(new VclFirewallService());  
if (fwServices != null && fwServices.length > 0){  
    System.log("");  
    System.log("==== Firewall services found: "+fwServices.length+" ====");  
    for each (fwService in fwServices){  
        System.log("----- NEED TO CODE THIS -----");  
    }  
}  
  
// Check Services for VclStaticRoutingService  
var staticRoutingServices = serviceSet.find(new VclStaticRoutingService());  
if (staticRoutingServices != null && staticRoutingServices.length > 0){  
    System.log("");  
    System.log("==== Static Routing services found: "+staticRoutingServices.length+" ====");  
    for each (staticRoutingService in staticRoutingServices){  
        System.log("----- NEED TO CODE THIS -----");  
    }  
}  
  
// Check Services for VclGatewayDhcpService  
var gwDhcpServices = serviceSet.find(new VclGatewayDhcpService());  
if (gwDhcpServices != null && gwDhcpServices.length > 0){  
    System.log("");  
    System.log("==== Gateway DHCP services found: "+gwDhcpServices.length+" ====");  
    for each (gwDhcpService in gwDhcpServices){  
        System.log("----- NEED TO CODE THIS -----");  
    }  
}  
  
// Check Services for VclDhcpService  
var dhcpServices = serviceSet.find(new VclDhcpService());  
if (dhcpServices != null && dhcpServices.length > 0){  
    System.log("");  
    System.log("==== DHCP services found: "+dhcpServices.length+" ====");  
    for each (dhcpService in dhcpServices){  
        System.log("----- NEED TO CODE THIS -----");  
    }  
}  
  
// Check Services for VclGatewayIpsecVpnService  
var gwIpsecVpnServices = serviceSet.find(new VclGatewayIpsecVpnService());  
if (gwIpsecVpnServices != null && gwIpsecVpnServices.length > 0){  
    System.log("");  
    System.log("==== Gateway Ipsec VPN services found: "+gwIpsecVpnServices.length+" ====");  
    for each (gwIpsecVpnService in gwIpsecVpnServices){  
        System.log("----- NEED TO CODE THIS -----");  
    }  
}  
  
// Check Services for VclLoadBalancerService  
var lbServices = serviceSet.find(new VclLoadBalancerService());  
if (lbServices != null && lbServices.length > 0){  
    System.log("");  
    System.log("==== Load Balancer services found: "+lbServices.length+" ====");  
    for each (lbService in lbServices){  
        System.log("---------------");  
        System.log("isEnabled: "+lbService.isEnabled);  
        System.log("otherAttributes: "+displayMap(lbService.otherAttributes));  
        System.log("-- Load Balancer Pools --");  
        var lbServicePool = lbService.pool; //VclObjectList -- related obj types: VclLoadBalancerPool  
        System.log("pool count: "+lbServicePool.size());  
        var lbServiceLBPools = lbServicePool.enumerate();  
        for each (lbPool in lbServiceLBPools){  
            System.log("- Pool Name: "+lbPool.name);  
            System.log("- Description: "+lbPool.description);  
            System.log("- errorDetails: "+lbPool.errorDetails);  
            System.log("- id: "+lbPool.id);  
            if(lbPool.member != null){  
                System.log("- Load Balancer Pool Members: "+lbPool.member.size()); // VclObjectList -- related obj types: VclLBPoolMember  
                var lbPoolMembers = lbPool.member.enumerate();  
                for each (lbPoolMember in lbPoolMembers){  
                    System.log("-- Load Balancer Pool Member --");  
                    System.log("ipAddress: "+lbPoolMember.ipAddress);  
                    System.log("otherAttributes: "+displayMap(lbPoolMember.otherAttributes)); // VclMap  
                    System.log("servicePort: "+displayServicePort(lbPoolMember.servicePort));  // VclObjectList -- related obj types: VclLBPoolServicePort  
                    System.log("vCloudExtension: "+displayVcloudExtension(lbPoolMember.vCloudExtension)); // VclObjectList -- related obj types: VclVCloudExtension  
                    System.log("weight: "+lbPoolMember.weight);  
                    System.log("XML: "+lbPoolMember.toXml());  
                }  
            }  
            System.log("- operational: "+lbPool.operational);  
            System.log("- otherAttributes: "+displayMap(lbPool.otherAttributes)); // VclMap  
            System.log("- servicePort: "+displayServicePort(lbPool.servicePort)); // VclObjectList -- related obj types: VclLBPoolServicePort  
            System.log("- vCloudExtension: "+displayVcloudExtension(lbPool.vCloudExtension)); // VclObjectList -- related obj types: VclVCloudExtension  
            System.log("- XML: "+lbPool.toXml());  
            System.log("");  
        }  
          
        System.log("-- Virtual Servers --");  
        var lbServiceVirtualServers = lbService.virtualServer; //VclObjectList -- related obj types: VclLoadBalancerVirtualServer  
        System.log("virtual server count: "+lbServiceVirtualServers.size());  
        var lbServiceVirtualServers = lbServiceVirtualServers.enumerate();  
        for each (lbVirtualServer in lbServiceVirtualServers){  
            System.log("== Load Balancer Virtual Server Name: "+lbVirtualServer.name);  
            System.log("description: "+lbVirtualServer.description);  
            System.log("ipAddress: "+lbVirtualServer.ipAddress);  
            System.log("isEnabled: "+lbVirtualServer.isEnabled);  
            System.log("interface name: "+lbVirtualServer["interface"].name); // VclReference  
            if (lbVirtualServer.loadBalancerTemplates != null){ // VclObjectList -- related obj types: VclVendorTemplate  
                System.log("===Load Balancer Templates ===");  
                var lbTemplates = lbVirtualServer.loadBalancerTemplates.enumerate();  
                for each (tpl in lbTemplates){  
                    System.log("name: "+tpl.name);  
                    System.log("id: "+tpl.id);  
                    System.log("otherAttributes: "+displayMap(tpl.otherAttributes));  
                    System.log("vCloudExtension: "+displayVcloudExtension(tpl.vCloudExtension));  
                    if (tpl.vendorTemplateAttributes != null){  
                        System.log("Template Attributes:");  
                        var atts = tpl.vendorTemplateAttributes.enumerate();  
                        for each (att in atts){  
                            System.log("key: "+att.key);  
                            System.log("name: "+att.name);  
                            System.log("value: "+att.value);  
                            System.log("otherAttributes: "+displayMap(att.otherAttribues));  
                            System.log("vCloudExtension: "+displayVcloudExtension(att.vCloudExtension));  
                            System.log("XML: "+att.toXml());  
                            System.log("");  
                        }  
                    }  
                }  
            }  
              
            System.log("logging: "+lbVirtualServer.logging);  
            System.log("otherAttributes: "+displayMap(lbVirtualServer.otherAttributes));  
            System.log("pool: "+lbVirtualServer.pool);  
            if(lbVirtualServer.serviceProfile != null){  
                var serviceProfiles = lbVirtualServer.serviceProfile.enumerate();  
                System.log("== ServiceProfile: "); // VclObjectList -- related obj types: VclLBVirtualServerServiceProfile  
                for each (sp in serviceProfiles){  
                    System.log("protocol: "+sp.protocol); // HTTP, HTTPS, TCP  
                    System.log("port: "+sp.port);  
                    System.log("isEnabled: "+sp.isEnabled);  
                    var persistence = sp.persistence;// VclLBPersistence  
                        System.log("-- Persistence: ");  
                         System.log("method: "+persistence.method);  
                        System.log("cookieMode: "+persistence.cookieMode);  
                        System.log("cookieName: "+persistence.cookieName);  
                        System.log("otherAttributes: "+displayMap(persistence.otherAttribues));  
                        System.log("vCloudExtension: "+displayVcloudExtension(persistence.vCloudExtension));  
                        System.log("XML: "+persistence.toXml());  
                    System.log("otherAttributes: "+displayMap(sp.otherAttribues));  
                    System.log("vCloudExtension: "+displayVcloudExtension(sp.vCloudExtension));  
                    System.log("XML: "+sp.toXml());  
                    System.log("");  
                }  
            }  
            System.log("vCloudExtension: "+displayVcloudExtension(lbVirtualServer.vCloudExtension));  
            System.log("XML: "+lbVirtualServer.toXml());  
            System.log("");  
        }  
    }  
}  
  
  
// Functions -- possibly re-write as actions:  
function displayServicePort(sps){  
    if(sps != null){  
        var spArray = sps.enumerate();  
        for each (sp in spArray){  
            System.log("-= Service Port Details =-");  
            System.log("protocol: "+sp.protocol);  
            System.log("port: "+sp.port);  
            System.log("healthCheckPort: "+sp.healthCheckPort);  
            System.log("isEnabled: "+sp.isEnabled);  
            System.log("algorithm: "+sp.algorithm);  
            System.log("healthCheck: "+displayHealthCheck(sp.healthCheck)); // VclObjectList -- VclLBPoolHealthCheck  
            System.log("otherAttribues: "+displayMap(sp.otherAttributes));  
            System.log("vCloudExtension: "+displayVcloudExtension(sp.vCloudExtension));  
            System.log("XML: "+sp.toXml());  
            System.log("");  
        }  
    }  
}  
  
function displayHealthCheck(hcs){  
    if(hcs != null){  
        var hcsArray = hcs.enumerate();  
        for each (hc in hcsArray){  
            System.log("-= Health Check Details =-");  
            System.log("healthThreshold: "+hc.healthThreshold);  
            System.log("interval: "+hc.interval);  
            System.log("mode: "+hc.mode); // possible values: TCP, HTTP, SSL  
            System.log("otherAttributes: "+displayMap(hc.otherAttributes)); // VclMap  
            System.log("timeout: "+hc.timeout);  
            System.log("unhealthThreshold: "+hc.unhealthThreshold);  
            System.log("uri: "+hc.uri);  
            System.log("vCloudExtension: "+displayVcloudExtension(hc.vCloudExtension));  
            System.log("XML: "+hc.toXml());  
            System.log("");  
        }  
    }  
}  
  
function displayMap(map){  
    if (map != null && map.keys.length > 0){  
        System.log("-= VclMap Details =-");  
        for each(key in map.keys){  
            System.log(key + ": "+map.get(key));  
        }  
        System.log("");  
    }  
}  
  
function displayVcloudExtension(vcle){  
    if(vcle != null){  
        System.log("-= vCloudExtension Details =-");  
        System.log("-- required: "+vcle.required);  
        System.log("-- otherAttributes: "+displayMap(vcle.otherAttribues));  
        System.log("");  
    }  
}  
  
// END FUNCTIONS ========  
  
    if (map != null && map.keys.length > 0){  
        System.log("-= VclMap Details =-");  
        for each(key in map.keys){  
            System.log(key + ": "+map.get(key));  
        }  
        System.log("");  
    }  
}  
  
function displayVcloudExtension(vcle){  
    if(vcle != null){  
        System.log("-= vCloudExtension Details =-");  
        System.log("-- required: "+vcle.required);  
        System.log("-- otherAttributes: "+displayMap(vcle.otherAttribues));  
        System.log("");  
    }  
}  
  
// END FUNCTIONS ==============================================  
======================================  
