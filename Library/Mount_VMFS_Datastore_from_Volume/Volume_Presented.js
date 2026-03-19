/**
 * Volume Presented
 *
 * @param {Array/Properties} actionResult1
 * @return {boolean} isVolumePresented
 * @return {number} lun
 */
if (actionResult1)
{
	for(var i = 0; i < actionResult1.length; i++) {

		isVolumePresented = true;
		var prop = 	actionResult1[i];
		if(prop) {
			lun = prop.get("lun");
			var volName = prop.get("volumeName");
			System.log("Volume Name: " + volName  +  " LUN: " + lun);
		}
	}
}