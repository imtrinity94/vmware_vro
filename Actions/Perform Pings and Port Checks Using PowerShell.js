/**
 * @description Builds and executes a PowerShell script via a vRO PowerShell host to ping a
 *              virtual server's FQDN and check TCP connectivity on a specified port. The result
 *              is stored back in the input JSON request object.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {PowerShell:PowerShellHost} objPowerShellHost - The PowerShell host to execute the script on.
 * @param {*} objVirtualServer - An object containing .Port and .IP properties for the server to check.
 * @param {*} objJsonRequest - The parent JSON request object where PingResult will be stored.
 * @param {number} i - The index of the virtual server within objJsonRequest.VirtualServers.
 * @returns {void}
 */

var strVirtualServerFQDN = "fqdn.vcoflow.co.uk";

var strPowerShellScript = '';
strPowerShellScript += '$objPing = New-Object System.Net.NetworkInformation.Ping\n';
strPowerShellScript += '$objResult = $objPing.Send("' + strVirtualServerFQDN + '")\n';
strPowerShellScript += 'if ( $objResult.Status.ToString() -eq "Success" )';
strPowerShellScript += '{';
strPowerShellScript += '\ttry';
strPowerShellScript += '\t{';
strPowerShellScript += '    \t$objSocket = New-Object System.Net.Sockets.TcpClient("' + strVirtualServerFQDN + '", ' + objVirtualServer.Port + ')\n';
strPowerShellScript += '\t\tif ( $objSocket -eq $null )\n';
strPowerShellScript += '\t\t{';
strPowerShellScript += '\t\t\tWrite-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is UP and Responding to Pings but DOWN On Port ' + objVirtualServer.Port + '" -NoNewLine';
strPowerShellScript += '\t\t}';
strPowerShellScript += '\t\telse';
strPowerShellScript += '\t\t{';
strPowerShellScript += '\t\t\tWrite-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is UP and Responding to Pings and UP On Port ' + objVirtualServer.Port + '" -NoNewLine';
strPowerShellScript += '\t\t}';
strPowerShellScript += '\t}';
strPowerShellScript += '\tcatch';
strPowerShellScript += '\t{';
strPowerShellScript += '\t\tWrite-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is UP and Responding to Pings but DOWN On Port ' + objVirtualServer.Port + '" -NoNewLine';
strPowerShellScript += '\t}';
strPowerShellScript += '}';
strPowerShellScript += 'else';
strPowerShellScript += '{';
strPowerShellScript += '\tWrite-Host "' + strVirtualServerFQDN + ' ( ' + objVirtualServer.IP + ' ) is DOWN and NOT Responding to Pings" -NoNewLine';
strPowerShellScript += '}';

System.log("===== Attempting to Ping Virtual Server FQDN = '" + strVirtualServerFQDN + "'");

var objPowerShellInvocationResult = objPowerShellHost.invokeScript(strPowerShellScript);

if (objPowerShellInvocationResult.invocationState == 'Failed') {
    var arrPowerShellInvocationResultErrors = objPowerShellInvocationResult.getErrors();

    for (var iii = 0; iii < arrPowerShellInvocationResultErrors.length; iii++) {
        var strPowerShellInvocationResultError = arrPowerShellInvocationResultErrors[iii];
    }

    System.error("PowerShell Invocation Error: " + arrPowerShellInvocationResultErrors);
} else {
    var strPowerShellInvocationResultHostOutput = objPowerShellInvocationResult.getHostOutput();
    strPowerShellInvocationResultHostOutput = strPowerShellInvocationResultHostOutput.replace(/\n/, "");

    System.log("===== " + strPowerShellInvocationResultHostOutput);

    objJsonRequest.VirtualServers[i].PingResult = strPowerShellInvocationResultHostOutput;
}
