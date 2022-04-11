var strVirtualServerFQDN;
	strVirtualServerFQDN = "fqdn.vcoflow.co.uk";

var strPowerShellScript;
	strPowerShellScript = '';	
	strPowerShellScript += '$objPing = New-Object System.Net.NetworkInformation.Ping\n';
	strPowerShellScript += '$objResult = $objPing.Send("' + strVirtualServerFQDN + '")\n';
	strPowerShellScript += 'if ( $objResult.Status.ToString() –eq “Success” )';
	strPowerShellScript += '{';	
	strPowerShellScript += '	try';
	strPowerShellScript += '	{';	
	strPowerShellScript += '    	$objSocket = New-Object System.Net.Sockets.TcpClient("' + strVirtualServerFQDN + '", ' + objVirtualServer.Port + ')\n';
	strPowerShellScript += '		if ( $objSocket –eq $null )\n';
	strPowerShellScript += '		{';
	strPowerShellScript += '			Write-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is UP and Responding to Pings but DOWN On Port ' + objVirtualServer.Port + '" -NoNewLine';
	strPowerShellScript += '		}';
	strPowerShellScript += '		else';
	strPowerShellScript += '		{';
	strPowerShellScript += '			Write-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is UP and Responding to Pings and UP On Port ' + objVirtualServer.Port + '" -NoNewLine';
	strPowerShellScript += '		}';
	strPowerShellScript += '	}';
	strPowerShellScript += '	catch';
	strPowerShellScript += '	{';
	strPowerShellScript += '		Write-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is UP and Responding to Pings but DOWN On Port ' + objVirtualServer.Port + '" -NoNewLine';
	strPowerShellScript += '	}';
	strPowerShellScript += '}';
	strPowerShellScript += 'else';
	strPowerShellScript += '{';
	strPowerShellScript += '	Write-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is DOWN and NOT Responding to Pings" -NoNewLine';
	strPowerShellScript += '}';

System.log ("===== Attempting to Ping Virtual Server FQDN = '" + strVirtualServerFQDN + "'");

var objPowerShellInvocationResult;
	objPowerShellInvocationResult = objPowerShellHost.invokeScript(strPowerShellScript);

if (objPowerShellInvocationResult.invocationState  == 'Failed')
{
	var arrPowerShellInvocationResultErrors;
		arrPowerShellInvocationResultErrors = objPowerShellInvocationResult.getErrors();

	for ( var iii = 0; iii < arrPowerShellInvocationResultErrors.length; iii++ )
	{
		var strPowerShellInvocationResultError;
			strPowerShellInvocationResultError = arrPowerShellInvocationResultErrors[iii];
	}

	System.error ("PowerShell Invocation Error: "  + arrPowerShellInvocationResultErrors);
}
else
{
	var strPowerShellInvocationResultHostOutput;
		strPowerShellInvocationResultHostOutput = objPowerShellInvocationResult.getHostOutput();
		strPowerShellInvocationResultHostOutput = strPowerShellInvocationResultHostOutput.replace(/\n/, "");

	System.log ("===== " + strPowerShellInvocationResultHostOutput );

	objJsonRequest.VirtualServers[i].PingResult = strPowerShellInvocationResultHostOutput;
}
