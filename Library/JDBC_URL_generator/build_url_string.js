/**
 * build url string
 *
 * @param {string} dbServer
 * @param {string} dbPort
 * @param {string} dbName
 * @param {string} dbInstance
 * @param {string} dbDomain
 * @param {string} dbType
 * @param {boolean} useNTLMv2 - [object Object]
 * @return {string} url
 */
switch( dbType ) {
	case "SQL Server/MSDE":
		//Microsoft SQL Server
		if(dbPort == null || dbPort == "")
		{
			dbPort="1433"; 
		}
		var url = "jdbc:jtds:sqlserver://"+dbServer+":"+dbPort+"/"+dbName;
		// Add an Instance if value exists:
		if(dbInstance != null && dbInstance != "")
		{
			url = url + ";instance="+dbInstance;
		}
		// Add a Domain if value exists:
		if(dbDomain != null && dbDomain != "")
		{
			url = url + ";domain="+dbDomain; 
		}
		// Use NTLMv2 Windows authentication
		if(useNTLMv2) {
			url = url + ";useNTLMv2=true";
		}
		break;
	case "Oracle":
		// Oracle
		if(dbPort == null || dbPort == "")
		{
			dbPort="1521"; 
		}
		var url = "jdbc:oracle:thin:@" + dbServer + ":" + dbPort + ":" + dbName;
		break;
	case "Postgres":
		if(dbPort == null || dbPort == "")
		{
			dbPort="5432"; 
		}
		var url = "jdbc:postgresql://"+dbServer+":"+dbPort+"/"+dbName;
		break;
	case "mySQL":
		if(dbPort == null || dbPort == "")
		{
			dbPort="3306"; 
		}
		var url = "jdbc:mysql://" + dbServer + ":" + dbPort +  "/" + dbName;
		break;
}
System.log("Connection String: "+url);