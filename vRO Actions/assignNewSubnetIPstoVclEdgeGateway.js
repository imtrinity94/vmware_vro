System.log("Starting Assign Subnet IPs to Edge Gateway");
var vCDHOST = System.getModule("org.telus.vCloud").getvCloudHost();
var utils = System.getModule("org.telus.xavient.util");
var all = [];
	allocated = [];
	suballocated = [],
	suballocationIPRangeArray = [],
	freeIPsArray = [],
    formerIPsArray = [],
	finallist = [];
var countercheck = 0;

var externalNetwork = EXTERNAL_NETWORK;

if (externalNetwork != null) {
    var ipScopes = externalNetwork.configuration.ipScopes.ipScope.enumerate();
    for each(ipScope in ipScopes) {
        var ipRanges = ipScope.ipRanges.ipRange.enumerate();
        var startIP, endIP;
        for (var ipIndex in ipRanges) {
            startIP = ipRanges[ipIndex].startAddress;
            endIP = ipRanges[ipIndex].endAddress;
        }
        all.push.apply(all, utils.getIPsBetweenRange(startIP, endIP));

        // array of allocated IP
        var allocatedips = ipScope.allocatedIpAddresses.ipAddress.enumerate();
        for (var index in allocatedips) {
            allocated.push(allocatedips[index]);
        }

        // array of Suballocated  IP
        var suballocatedips = ipScope.subAllocations.subAllocation.enumerate();
        for (var index in suballocatedips) {
            var ranges = suballocatedips[index].ipRanges.ipRange;
            for each(range in ranges.enumerate()) {
                var startsubips = range.startAddress;
                var endsubips = range.endAddress;
                if (suballocatedips[index].edgeGateway.name == EDGE_GATEWAY.name) {
                    formerIPsArray.push(startsubips);
                    formerIPsArray.push(endsubips);
					
					// contains earlier allocated subnet IPs for this Edge gateway
					formerIPsArray.push.apply(formerIPsArray, utils.getIPsBetweenRange(startsubips, endsubips)); 
                }
                suballocated.push.apply(suballocated, utils.getIPsBetweenRange(startsubips, endsubips));
				TOTAL_SUBALLOCATED_IPS = suballocated;
            }
        }
    }
}


// merge the allocated and suballocated IPs of External Network

finallist.push.apply(finallist, suballocated);
finallist.push.apply(finallist, allocated);
var uniqueall = all.filter(onlyUnique); 
var uniquefinallist = finallist.filter(onlyUnique);
uniquefinallist.sort();


for (var i = 0; i < uniqueall.length; i++) {
    var found = false;
    for (var j = 0; j < uniquefinallist.length; j++) { // j < is missed;
        if (all[i] == uniquefinallist[j]) {
            found = true;
            break;
        }
    }
    if (found == false) {
        if (countercheck == NO_OF_ADDRESSES) {
            break;
        }
        freeIPsArray.push(all[i]);
        countercheck += 1;
    }
}
freeIPsArray = freeIPsArray.filter(onlyUnique);
freeIPsArray.sort();
NEW_SUBALLOCATED_IPS = freeIPsArray;
formerIPsArray = formerIPsArray.filter(onlyUnique);
formerIPsArray.sort();
freeIPsArray = freeIPsArray.concat(formerIPsArray);

//IPs are selected. Now, it will assign these IPs
if (freeIPsArray.length < NO_OF_ADDRESSES) {
    IP_LIMIT_EXHAUSTED = true;
    System.debug("No ip address available to allocate");
} else {
    if (EDGE_GATEWAY != null) {

        var contarray = utils.getUniqueIPBlocks(freeIPsArray);
        var SubAllocationsObj = new VclSubAllocation();
        SubAllocationsObj.edgeGateway = EDGE_GATEWAY.getReference();
        if (contarray) {
            for (var elem in contarray) {
                var ipRange = new VclIpRange();
                ipRange.startAddress = contarray[elem].start;
                ipRange.endAddress = contarray[elem].end;
                var ipRanges = new VclIpRanges();
                ipRanges.ipRange.add(ipRange);
                SubAllocationsObj.ipRanges = ipRanges;
            }
        }

        if (EXTERNAL_NETWORK != null) {
            try {
                System.debug("Begin to update external network");
                var externalNetwork = EXTERNAL_NETWORK.toAdminExtensionObject();
                externalNetwork.configuration.ipScopes.ipScope.enumerate()[0].subAllocations.subAllocation.add(SubAllocationsObj);
				System.debug("External network updated");
            } catch (ex) {
                throw "Failed to update External network. (Reason: " + ex + ")";
            }
        } else {
            throw "Failed to update External network. External network not found";
        }

        var ipRanges = new VclIpRanges();
        if (contarray) {
            for (var elem in contarray) {
                TRANSLATED_IP = contarray[elem].start;
                var ipRange = new VclIpRange();
                ipRange.startAddress = contarray[elem].start;
                ipRange.endAddress = contarray[elem].end;
                ipRanges.ipRange.add(ipRange);
            }
        }

        try {
            System.debug("Begin to update Edge gateway");
            EDGE_GATEWAY.configuration.gatewayInterfaces.gatewayInterface.enumerate()[0].subnetParticipation.enumerate()[0].ipRanges = ipRanges;
            task = EDGE_GATEWAY.update();
            while (task.status == "queued" || task.status == "running") {
            	System.sleep(5000);
            }
			System.log("Edge Gateway updation status: "+task.status);
			taskStatus = task.status;
        } catch (ex) {
            throw "Failed to update Edge gateway. (Reason: " + ex + ")";
        }
        EDGE_GATEWAY.syncSyslogServer();
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
System.log("End Assign Subnet IPs to Edge Gateway");
