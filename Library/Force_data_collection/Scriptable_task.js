/**
 * Scriptable task
 *
 * @param {vCAC:VCACHost} host
 */
var modelName = 'ManagementModelEntities.svc';
var entitySetName = 'DataCollectionStatuses';

//Read a list of entities
var entities = vCACEntityManager.readModelEntitiesByCustomFilter(host.id, modelName, entitySetName, null, null);


for each (entity in entities) {
	var entityKey = entity.keyString;
	System.log("Updating entity with key: " + entityKey);
	
	var links = null;
	var headers = null;
	var updateProperties = {
		"LastCollectedTime":null
	};
	
	vCACEntityManager.updateModelEntityBySerializedKey(host.id, modelName, entitySetName, entityKey, updateProperties, links, headers);
}