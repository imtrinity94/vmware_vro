/**
 * Scriptable task
 *
 * @param {boolean} removeAllConfigs
 */

            Server.log("Removing all configurations of vCenter server with associated Update Manager ...");
                if (removeAllConfigs === true) {
                   VumObjectManager.removeAllVcenterWithVum();
                   Server.log("All vCenter server with associated Update Manager server are removed.");
                } else {
                   Server.error("No vCenter server with associated Update Manager server configurations were removed.");
                }
            
        