/**
 * Find wwn
 *
 * @param {VC:Datastore} datastore
 * @return {string} wwn
 */
if(!datastore) throw "Datastore parameter must not be empty!"

var dsName = datastore.summary.name;

System.log( "Datastore '" + dsName + "' type: " + datastore.summary.type);

if(datastore.summary.type !== "VMFS") throw "Datastore '"+ dsName + "' must be type of VMFS datastore!"

if(!datastore.info.vmfs) throw "The datastore '"+ dsName + "' is not accessible!"

var deviceNaa =  datastore.info.vmfs.extent[0].diskName;


wwn = deviceNaa.substring(4);
System.log( "Found SCSI device NAA: " + wwn);