/**
 * Create a table
 *
 * @param {SecureString} password
 * @param {string} sqlStatement
 * @param {string} url
 * @param {string} user
 */
var main = new JDBCConnection();
var con;
try  {
	con = main.getConnection( url, user, password );
	System.log( "Connection to database successful" );
	
	var stat = con.createStatement();
	var result = stat.executeUpdate( sqlStatement );
	stat.close();
	if ( result >= 0 )  {
		System.log( "Table rows deletion successful" );
	}
	else  {
		System.error( "Table rows deletion failed" );
	}
}
catch( ex )  {
	throw "Connection to database failed (Reason: " + ex + ")";
} finally {
	if (con) {
		con.close();
	}
}
