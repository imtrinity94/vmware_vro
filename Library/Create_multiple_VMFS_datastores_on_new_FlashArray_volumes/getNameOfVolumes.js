/**
 * Getting name of the volumes to create.
 *
 * @param {number} count
 * @param {string} volName
 * @return {Array/string} volumeNames
 */
if(!count){
	System.error("Count is required field.");
}
if(!volName){
	System.error("Volume name required.");
}

var volumeNames = new Array();

for(var i=1;i<=count;i++){
	var randomNo=Math.floor(Math.random() * 1000000);
 	if(randomNo < 100000){
		i=i-1;
		continue;
	}
 	volumeNames.push(volName+ "_" +randomNo);
}

System.log("Name of the volume to be create:" +volumeNames);