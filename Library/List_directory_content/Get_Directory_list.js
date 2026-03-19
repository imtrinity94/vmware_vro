/**
 * Get Directory list
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {string} directory
 */
var sess;
try {
	sess = host.openSession()
	sess.addCommandFromString("dir " + directory)
	var invResult = sess.invokePipeline();
	//Show result
	System.log( invResult.getHostOutput() );
	
	//Check for errors
	if (invResult.invocationState  == 'Failed'){
		System.error(invResult.getErrors());
	} else {
		// Get PowerShellRemotePSObject
		var psObject = invResult.getResults();
		var directories = psObject.getRootObject();
		
		var isList =  directories instanceof Array
		if ( isList ){
			for (idx in directories){
				var item = directories[idx];
				if ( item.instanceOf('System.IO.FileInfo') ){//check type of object
					System.log( item.getProperty('FullName') );//extract value from result
				}
			}
		} else {
			System.log( directories.getProperty('FullName') );//extract value from result
		}	
	}
} catch ( ex ) {			
	System.log (ex);
} finally {
	if (sess) {
		host.closeSession( sess.getSessionId());
	}
}