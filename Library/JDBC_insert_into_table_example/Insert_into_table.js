/**
 * Create a table
 *
 * @param {string} url
 * @param {string} user
 * @param {SecureString} password
 * @param {string} sqlStatement
 * @param {string} firstName
 * @param {string} lastName
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
		System.log( "Row ('"+firstName+"', '"+lastName+"') inserted in table successfully" );
	} else  {
		System.error( "Row insertion in table failed" );
	}
	
}
catch( ex )  {
	throw "Connection to database failed (Reason: " + ex + ")";
} finally {
	if (con) {
		con.close();
	}
}