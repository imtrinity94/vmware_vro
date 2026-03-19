/**
 * Volume Name for Clone Operation
 *
 * @param {boolean} migrate
 * @param {Array/PS:Volume} faVolumes
 * @return {Array/string} volNames
 */
while(true){
	var randomNo=Math.floor(Math.random() * 10000);
 	if(randomNo > 999 && randomNo < 10000){
		break;
	}
}
var volNames = [];
if(!migrate){
	for(var i = 0 ; i < faVolumes.length; i++)
	{
		volNames.push(faVolumes[i].name+"-clone-"+ randomNo);
	}
}
else{
	for(var i = 0 ; i < faVolumes.length; i++)
	{
		volNames.push(faVolumes[i].name);
	}
}