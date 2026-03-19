/**
 * Removes puppet master from inventory
 *
 * @param {Puppet:Master} master
 */
try {
    master.remove();
}
catch (e) {
    if (e.toString().indexOf("Cannot find function remove in object notfound") !== -1) {
        System.log("Puppet:Master object was no longer in inventory when remove called.");
    }
    else {
        System.log(e);
    }
}
System.log("Attempting to find the host key " + master.getHost() + " and remove it");
hostExecutor = new PuppetKnownHosts();
matchingHosts = hostExecutor.hostInHostsFile(master.getHost());
if(matchingHosts > 0){
	message = "Found " + matchingHosts + " keys matching host " + master.getHost();
	System.log(message);
	hostExecutor.removeDuplicates(master.getHost());
}
