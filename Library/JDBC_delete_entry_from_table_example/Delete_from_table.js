/**
 * Create a table
 *
 * @param {string} user
 * @param {string} url
 * @param {string} sqlStatement
 * @param {SecureString} password
 * @param {string} lastName
 * @param {string} firstName
 */
var main = new JDBCConnection();
var con;
try  {
	con = main.getConnection( url, user, password );
	System.log( "Connection to database successful" );
	
	var stat = con.prepareStatement( sqlStatement );
	stat.setString( 1, firstName );
	stat.setString( 2, lastName );
	var result = stat.executeUpdate();
	stat.close();
	if ( result == 1 )  {
		System.log( "Table row ('"+firstName+"', '"+lastName+"') deleted successfully" );
	} else  {
		System.log( "Nothing to delete" );
	}
}
catch( ex )  {
	throw "Connection to database failed (Reason: " + ex + ")";
} finally {
	if (con) {
		con.close();
	}
}
