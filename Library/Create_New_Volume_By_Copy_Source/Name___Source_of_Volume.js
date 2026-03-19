/**
 * Name & Source of Volume
 *
 * @param {PS:Snapshot} snapshot
 * @param {string} volume
 * @return {string} snapName
 */
if(!volume)
{
	System.log("Volume name should not be empty");
}
snapName = snapshot.name;