/**
 * Scriptable task
 *
 * @param {number} size
 * @param {string} sizeUnit
 * @return {number} sizeMiB
 */
sizeMiB = 0;
if(sizeUnit === 'TiB'){
size = size*1024;
sizeUnit = 'GiB';

}

if(sizeUnit === 'GiB'){
size = size*1024;
sizeUnit = 'MiB';

}

sizeMiB = size;
