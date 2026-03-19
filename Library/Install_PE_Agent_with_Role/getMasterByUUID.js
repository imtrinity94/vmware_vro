/**
 * getMasterByUUID
 *
 * @param {string} uuid
 * @param {Puppet:Master} activePuppetMaster
 * @param {string} errorCode
 * @param {string} puppetInstallMaster
 * @return {Puppet:Master} activePuppetMaster
 * @return {string} errorCode
 */
var master = null;
if (uuid) {
    try {
      master = System.getModule("com.puppet.o11n.plugin.puppet").getMasterByUUID(uuid);
    }
    catch (e) {
      errorCode += "\n" + "Error getting Puppet:Master with supplied UUID: " + e + ".";
    }
}

if (master !== null) {
  System.debug("Setting activePuppetMaster to: " + master);
  activePuppetMaster = master;
}
else {
  errorCode += "\n" + "Supplied Puppet.Master.UUID does not belong to any valid Puppet:Master in Inventory.";
}