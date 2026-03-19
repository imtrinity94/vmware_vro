/**
 * Create a table
 *
 * @param {string} user
 * @param {string} url
 * @param {string} sqlStatement
 * @param {SecureString} password
 */
var main = new JDBCConnection();
var con;
try  {
	con = main.getConnection( url, user, password );
	System.log( "Connection to database successful" );
	var stat = con.createStatement();
	var result = stat.executeUpdate( sqlStatement );
	stat.close();
	if ( result == 0 )  {
		System.log( "Table deletion successful" );
	} else  {
		System.error( "Table deletion failed" );
	}
}
catch( ex )  {
	throw "Connection to database failed (Reason: " + ex + ")";
} finally {
	if (con) {
		con.close();
	}
}