//The following script removes a virtual machine from Puppet during decommissioning using the Puppet REST API

var arrPuppetMasters;
	arrPuppetMasters = new Array();
	arrPuppetMasters.push("puppet-master-01");
	arrPuppetMasters.push("puppet-master-02");

var strHostName;
	strHostName = arrHostNames[i].toLowerCase();

for ( var ii = 0; ii < arrPuppetMasters.length; ii++ )
{
	var strPuppetMaster;
		strPuppetMaster = arrPuppetMasters[ii];

	System.log("===== Attempting to DELETE the SSL Certificate for '" + strHostName + "' from " + strPuppetMaster);

	try
	{
		var objURL;
			objURL = new URL("https://" + strPuppetMaster + ":8140/production/certificate_status/" + strHostName );
			objURL.requestType = "DELETE";

		var strContent;
			strContent = objURL.getContent();
			strContent = strContent.replace(/\n/, "");

		System.log("===== Result: " + strContent);
	}
	catch(objException)
	{
		System.error("===== Failed to DELETE the SSL Certificate for '" + strHostName + ".vcoflow.co.uk' from " + strPuppetMaster);
	}
}
