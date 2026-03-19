/**
 * Retrive device info
 *
 * @param {PowerShell:PowerShellHost} host
 */
//Open PowerShell Session
var sess 
try {
	sess = host.openSession()
	//Set executed script 
	var script = ' $allDrives = [system.Io.DriveInfo]::GetDrives() \r\n' +
					' foreach ($d in $allDrives)  { \r\n' +
					'    "Drive {0}"        -f $d.Name \r\n' +
					'    "  File type: {0}" -f $d.DriveType \r\n' +
					'    if ($d.IsReady)  { \r\n' +
					'         "  Volume label: {0}" -f $d.VolumeLabel \r\n' +
					'         "  File system: {0}"  -f $d.DriveFormat \r\n' +
					'         $fs  = $d.AvailableFreeSpace/1gb \r\n' +
					'         $tfs = $d.TotalFreeSpace/1gb \r\n' +
					'         $TS  = $d.TotalSize/1gb \r\n' +
					'         "  Available space to current user:{0, 15:n2} gb" -f $fs \r\n' +
					'         "  Total available space:          {0, 15:n2} gb" -f $tfs \r\n' +
					'         "  Total size of drive:            {0, 15:n3} gb" -f $ts \r\n' +
					'    } \r\n' +
					' } \r\n';
					//Set input parameters
	var result = sess.invokeScript(script)
	
	//Check for errors
	if (result.invocationState  == 'Failed'){
		throw "PowerShellInvocationError: Errors found while executing script \n"  + result.getErrors();
	}
	//Show result
	System.log( result.getHostOutput() );
} catch (ex) {
	System.error(ex)
} finally {
	//Close session
	if (sess) {
		host.closeSession( sess.getSessionId());
	}
}