/**
 * Deploy a package
 *
 * @param {Package} pkg
 * @param {Array/VCO:RemoteServer} servers
 * @param {boolean} override
 * @return {Array/string} errors
 */
var impStatusList = null;
var errors = new Array()

if (pkg == "notfound"){
	msg = "Package can not be found."
	logError(msg)
} else {

	System.log(	"==== Deploying [" + pkg.name + "] ==== ")
	try {
		impStatusList = VCODeploymentManager.deployPackage(pkg, servers, override)
	} catch (e) {
		logError(e.message)
	}

	for( var i in impStatusList)
	{
		var impStatus = impStatusList[i]

		System.log(	"==== " + impStatus.getTargetName() + " ==== " + impStatus.getStatusAsString() )

		var messages = impStatus.getMessages()
		for (var j in messages)
		{
			log(messages[j])
		}
	}
}

function logError(msg){
	errors.push(msg)
	System.error(msg)
}

function log(msg){
	if ( msg.severity == "ERROR" ){
		logError(msg.message)
	} else 	if ( msg.severity == "WARNING" ){
		System.warn(msg.message)
	} else {
		System.log(msg.message)
	}
}

