/**
 * host configuration
 *
 * @param {PS:Host} sourceHost
 * @return {string} hostName
 * @return {Array/string} iqnList
 * @return {Array/string} wwnList
 */
if(!sourceHost){
System.error("Source Host required!!");
}

hostName=sourceHost.name;

iqnList=sourceHost.iqn;
	
wwnList=sourceHost.wwn;	
