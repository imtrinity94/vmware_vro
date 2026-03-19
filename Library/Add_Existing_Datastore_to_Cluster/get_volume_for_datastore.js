/**
 * get volume for datastore
 *
 * @param {PS:Volume} psVolume
 */
if(!psVolume){
System.error("Volume not found!!");
}

System.log("FA volume of datastore is:" +psVolume.name);
System.debug("Volume:" +psVolume);