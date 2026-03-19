/**
 * sizeConverter
 *
 * @param {number} increaseBy
 * @param {StoreServ:Volume} volume
 * @param {string} increaseByUnit
 * @return {number} growVolumeSIze
 */
var sizeMiB = 0;
if(increaseByUnit === 'TiB'){
increaseBy = increaseBy*1024;
increaseByUnit = 'GiB';

}

if(increaseByUnit === 'GiB'){
increaseBy = increaseBy*1024;
increaseByUnit = 'MiB';

}

growVolumeSIze = increaseBy + volume.size;