/**
 * Display all locks
 *
 */
var locks = LockingSystem.retrieveAll();
if ( locks != null && locks.length > 0 )  {
	System.log( "Found " + locks.length + " locks:" );
	for ( var ii in locks )  {
		System.log( "\tLock " + ii + " = '" + locks[ii] + "'" );
	}
}
else  {
	System.log( "No lock found." );
}
