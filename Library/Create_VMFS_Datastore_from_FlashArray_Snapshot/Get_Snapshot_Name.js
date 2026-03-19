/**
 * Get Snapshot Name
 *
 * @param {PS:Snapshot} snapshotObject - [object Object]
 * @return {string} snapshotName
 * @return {PS:FlashArrayConnection} flashArrayConnection
 */
snapshotName = snapshotObject.name;

var snapId = snapshotObject.id;
var connectionName = snapId.substring(0,snapId.indexOf("::"));
System.debug("FlashArray Connection Name: " + connectionName);
flashArrayConnection = PSFlashArrayConnectionManager.getFlashArrayConnection(connectionName);
System.debug("FlashArray Connection Object: " + flashArrayConnection);