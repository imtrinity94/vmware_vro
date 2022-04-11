var strCurrentDB;
	strCurrentDB = "SQLServer";

var intDatabasePort;
	intDatabasePort = 0;

var strHostName;
	strHostName = "SQLServer";

var strActiveDirectoryDomainName;
	strActiveDirectoryDomainName = "vcoflow.local";

var strDatabaseFQDN;
	strDatabaseFQDN = strHostName + "." + strActiveDirectoryDomainName;	

var blnSslEnabled;
	blnSslEnabled = false;

var strDatabaseUserName;
	strDatabaseUserName = "vCenterOrchestrator";

var strDatabasePassWord;
	strDatabasePassWord = "P@55w0rd!";

var strDatabaseName;
	strDatabaseName = "vCenterOrchestrator";
	
var strDatabaseInstance;
	strDatabaseInstance = "";

var strDomainName;
	strDomainName = "";

var blnUseNTLM;
	blnUseNTLM = false;
	
var objConfiguratorDatabase;
	objConfiguratorDatabase = Config.getDatabase();

var objConfiguratorDatabaseConfiguratorAction;
	objConfiguratorDatabaseConfiguratorAction = objConfiguratorDatabase.getDatabaseConfiguratorAction();

var objConfiguratorDatabase;
	objConfiguratorDatabase = objConfiguratorDatabaseConfiguratorAction.getModel();
	objConfiguratorDatabase.setCurrentDB(strCurrentDB);
	objConfiguratorDatabase.setHost(strDatabaseFQDN);
	objConfiguratorDatabase.setPort(intDatabasePort);
	objConfiguratorDatabase.setSslEnabled(blnSslEnabled);
	objConfiguratorDatabase.setUser(strDatabaseUserName);
	objConfiguratorDatabase.setPassword(strDatabasePassWord);
	objConfiguratorDatabase.setInstanceName(strDatabaseInstance);
	objConfiguratorDatabase.getCurrentDB().setDBName(strDatabaseName);
	objConfiguratorDatabase.getCurrentDB().setDomainName(strDomainName);
	objConfiguratorDatabase.getCurrentDB().setUseNTLMv2(blnUseNTLM);

var strErrorValidate;
	strErrorValidate = objConfiguratorDatabaseConfiguratorAction.validate();

var strErrorExecute;
	strErrorExecute = objConfiguratorDatabaseConfiguratorAction.execute();
