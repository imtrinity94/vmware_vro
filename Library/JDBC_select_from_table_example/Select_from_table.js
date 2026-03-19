/**
 * Create a table
 *
 * @param {string} url
 * @param {string} user
 * @param {SecureString} password
 * @param {string} sqlStatement
 */
var main = new JDBCConnection();
var con;
try  {
	con = main.getConnection( url, user, password );
	System.log( "Connection to database successful" );
	var stat = con.createStatement();
	var rs = stat.executeQuery( sqlStatement );
	var i = 0;
	var firstNameColName = "firstName";
	var lastNameColName = "lastName";
	while ( rs.next() )  {
		System.log( "Row[" + i + "] : " + firstNameColName + "='" + rs.getString(firstNameColName)
		  + "', " + lastNameColName + "='" + rs.getString(lastNameColName) + "'" );
		i++;
	}
	if ( i == 0 )  {
		System.log( "No rows" );
	}
	rs.close();
	stat.close();
} catch( ex )  {
	throw "Connection to database failed (Reason: " + ex + ")";
} finally {
	if (con) {
		con.close();
	}
}