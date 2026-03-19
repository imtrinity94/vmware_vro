/**
 * Log properties
 *
 * @param {Properties} props
 * @param {boolean} logProps
 * @param {Path} logFile
 */
if (logProps) {
	var myFileWriter = new LogFileWriter(logFile);
	try {
		myFileWriter.open();
		//myFileWriter.clean();
		for each (var key in props.keys) {
			myFileWriter.writeLine(key + " : '" + props.get(key) + "'");
		}		
		myFileWriter.writeLine("===========================================================================");
	}
	catch (ex) {
		Server.warn ("Error logging" + ex);
	}
	finally {
		try {
			myFileWriter.close();
		}
		catch (ex) {
			Server.warn ("Error closing file" + ex);
		}
		
	}
}