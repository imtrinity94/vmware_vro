/**
 * is Volume Presented
 *
 * @param {Array/Properties} exportResult
 * @return {boolean} isVolumePresented
 * @return {number} lunid
 */
if (exportResult)
{
	isVolumePresented = true;
	lunid = exportResult[0].lun;
}