/**
 * Create a table
 *
 * @param {string} user
 * @param {string} url
 * @param {SecureString} password
 */
var main = new JDBCConnection();
var con;
try  {
	con = main.getConnection( url, user, password );
	System.log( "Connection to database successful" );
}
catch( ex )  {
	throw "Connection to database failed (Reason: " + ex + ")";
} finally {
	if (con) {
		con.close();
	}
}

