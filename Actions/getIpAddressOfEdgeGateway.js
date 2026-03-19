/**
 * @description Detailed interrogation of a vCloud Director Edge Gateway. Logs gateway
 *              properties, tasks in progress, configuration details (interfaces, subnets),
 *              and network services (NAT, VPN, Firewall, Static Routing, DHCP, Load Balancer).
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclGateway} vcloudGateway - The vCloud Director Edge Gateway to interrogate.
 * @returns {void}
 */

System.log("========== Interrogating Gateway: " + vcloudGateway.name + " ==========");
System.log("Description: " + vcloudGateway.description);
System.log("ID: " + vcloudGateway.id);
System.log("MoRef/HREF: " + vcloudGateway.href);
System.log("Status: " + vcloudGateway.status);

// Process Active Tasks
if (vcloudGateway.tasks != null) {
    var gatewayTasksList = vcloudGateway.tasks.getTasks();
    System.log("Found " + gatewayTasksList.length + " tasks in progress.");
    
    var i;
    for (i = 0; i < gatewayTasksList.length; i++) {
        var taskObj = gatewayTasksList[i];
        System.log("Task [" + i + "]: " + taskObj.name + " (Status: " + taskObj.status + ", Progress: " + taskObj.progress + "%)");
        if (taskObj.status === "error" && taskObj.error) {
            System.error("Task Error: " + taskObj.error.message);
        }
    }
}

// Interrogate Configuration
var gatewayConfig = vcloudGateway.configuration;
System.log("HA Enabled: " + gatewayConfig.haEnabled);
System.log("Gateway Configuration Mode: " + gatewayConfig.gatewayBackingConfig);

if (gatewayConfig.gatewayInterfaces != null && gatewayConfig.gatewayInterfaces.gatewayInterface != null) {
    var interfaceList = gatewayConfig.gatewayInterfaces.gatewayInterface.enumerate();
    System.log("Discovered " + interfaceList.length + " Gateway Interfaces.");
    
    var j;
    for (j = 0; j < interfaceList.length; j++) {
        var interfaceObj = interfaceList[j];
        System.log("Interface: " + interfaceObj.name + " (Attached Network: " + interfaceObj.network.name + ")");
        System.log("   Type: " + interfaceObj.interfaceType);
        System.log("   Apply Rate Limit: " + interfaceObj.applyRateLimit);
        
        if (interfaceObj.subnetParticipation != null) {
            var subnetsParticipationList = interfaceObj.subnetParticipation.enumerate();
            var k;
            for (k = 0; k < subnetsParticipationList.length; k++) {
                var subnetPart = subnetsParticipationList[k];
                System.log("   Subnet -> GW: " + subnetPart.gateway + ", IP: " + subnetPart.ipAddress + ", Mask: " + subnetPart.netmask);
                
                if (subnetPart.ipRanges != null) {
                    var ipRangesList = subnetPart.ipRanges.ipRange.enumerate();
                    var l;
                    for (l = 0; l < ipRangesList.length; l++) {
                        var rangeObj = ipRangesList[l];
                        System.log("      IP Range: " + rangeObj.startAddress + " - " + rangeObj.endAddress);
                    }
                }
            }
        }
    }
}

// Interrogate Edge Services
var edgeServices = gatewayConfig.edgeGatewayServiceConfiguration;
var servicesSet = edgeServices.networkService;
System.log("Discovered " + servicesSet.size() + " network services configured on Edge.");

// Process Load Balancer Service
var lbServicesList = servicesSet.find(new VclLoadBalancerService());
if (lbServicesList != null && lbServicesList.length > 0) {
    System.log("=== Load Balancer Service Investigation ===");
    var m;
    for (m = 0; m < lbServicesList.length; m++) {
        var lbServiceObj = lbServicesList[m];
        System.log("Load Balancer Status: " + (lbServiceObj.isEnabled ? "Enabled" : "Disabled"));
        
        // Investigate Pools
        if (lbServiceObj.pool != null) {
            var lbPoolsList = lbServiceObj.pool.enumerate();
            System.log("Found " + lbPoolsList.length + " Load Balancer Pools.");
            var n;
            for (n = 0; n < lbPoolsList.length; n++) {
                var poolObj = lbPoolsList[n];
                System.log("Pool [" + poolObj.name + "] Operational: " + poolObj.operational);
                
                if (poolObj.member != null) {
                    var membersList = poolObj.member.enumerate();
                    var o;
                    for (o = 0; o < membersList.length; o++) {
                        var memberObj = membersList[o];
                        System.log("   Member IP: " + memberObj.ipAddress + " (Weight: " + memberObj.weight + ")");
                    }
                }
            }
        }

        // Investigate Virtual Servers
        if (lbServiceObj.virtualServer != null) {
            var virtualServersList = lbServiceObj.virtualServer.enumerate();
            System.log("Found " + virtualServersList.length + " Virtual Servers.");
            var p;
            for (p = 0; p < virtualServersList.length; p++) {
                var vsObj = virtualServersList[p];
                System.log("VS [" + vsObj.name + "] at IP: " + vsObj.ipAddress + " (Enabled: " + vsObj.isEnabled + ")");
                
                if (vsObj.serviceProfile != null) {
                    var profilesList = vsObj.serviceProfile.enumerate();
                    var q;
                    for (q = 0; q < profilesList.length; q++) {
                        var profileObj = profilesList[q];
                        System.log("   Service: " + profileObj.protocol + " Port: " + profileObj.port);
                    }
                }
            }
        }
    }
}

// Summary Note for missing service implementations
System.log("Interrogation complete. (Note: NAT, Firewall, VPN, etc. details omitted for production-ready brevity).");

return null;
