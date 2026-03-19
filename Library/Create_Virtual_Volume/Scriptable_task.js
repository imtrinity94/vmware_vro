/**
 * Scriptable task
 *
 * @param {string} Type
 * @param {boolean} compression
 * @return {boolean} tpvv
 * @return {boolean} tdvv
 * @return {boolean} comp
 */
if(Type === 'Full'){
tpvv=false;
tdvv=false;
}else if(Type === 'ThinDedupe'){
tpvv=false;
tdvv=true;
}else{
tpvv=true;
tdvv=false;
}

comp = compression;
if(compression && Type === 'Full'){
	comp = false;
}