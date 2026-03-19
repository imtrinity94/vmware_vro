/**
 * Scriptable task
 *
 * @param {StoreServ:Volume} volume
 * @return {string} snapVolName
 * @return {string} snapAccessPermissions
 * @return {number} expirationHours
 * @return {number} retentionHours
 * @return {boolean} accessPermissionValue
 */

var d = (new Date());
var name_time = volume.name.slice(0,15)+d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+d.getDate()+'-'
			+('0'+d.getHours()).slice(-2)+'-'+('0'+d.getMinutes()).slice(-2);

snapVolName = name_time;
    
snapAccessPermissions = "Read_Write";
expirationHours = 24;
retentionHours = 0;
accessPermissionValue = true;
System.log("Restore snapshot will be created with name: "+name_time+" expiration hours set to 24");