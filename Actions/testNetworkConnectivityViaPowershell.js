/**
 * @description Builds and executes a PowerShell script via a vRO PowerShell host to ping a
 *              virtual server's FQDN and check TCP connectivity on a specified port. The result
 *              is stored back in the input JSON request object.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {PowerShell:PowerShellHost} psHostObj - The PowerShell host to execute the script on.
 * @param {Any} serverTargetObj - An object containing .Port and .IP properties for the server to check.
 * @param {Any} jsonRequestPayload - The parent JSON request object where PingResult will be stored.
 * @param {number} serverIndex - The index of the virtual server within jsonRequestPayload.VirtualServers.
 * @returns {void}
 */

var targetServerFqdnStr = "fqdn.vcoflow.co.uk"; // Example placeholder from original
var targetServerPortNum = serverTargetObj.Port;
var targetServerIpStr = serverTargetObj.IP;

var powershellCodeBlock = '';
powershellCodeBlock += '$pingSvc = New-Object System.Net.NetworkInformation.Ping\n';
powershellCodeBlock += '$pingResult = $pingSvc.Send("' + targetServerFqdnStr + '")\n';
powershellCodeBlock += 'if ($pingResult.Status.ToString() -eq "Success") {\n';
powershellCodeBlock += '    try {\n';
powershellCodeBlock += '        $tcpSvc = New-Object System.Net.Sockets.TcpClient("' + targetServerFqdnStr + '", ' + targetServerPortNum + ')\n';
powershellCodeBlock += '        if ($tcpSvc -eq $null) {\n';
powershellCodeBlock += '            Write-Host "' + targetServerFqdnStr + ' (' + targetServerIpStr + ') is UP and Responding to Pings but DOWN On Port ' + targetServerPortNum + '" -NoNewLine\n';
powershellCodeBlock += '        } else {\n';
powershellCodeBlock += '            Write-Host "' + targetServerFqdnStr + ' (' + targetServerIpStr + ') is UP and Responding to Pings and UP On Port ' + targetServerPortNum + '" -NoNewLine\n';
powershellCodeBlock += '        }\n';
powershellCodeBlock += '    } catch {\n';
powershellCodeBlock += '        Write-Host "' + targetServerFqdnStr + ' (' + targetServerIpStr + ') is UP and Responding to Pings but DOWN On Port ' + targetServerPortNum + '" -NoNewLine\n';
powershellCodeBlock += '    }\n';
powershellCodeBlock += '} else {\n';
powershellCodeBlock += '    Write-Host "' + targetServerFqdnStr + ' (' + targetServerIpStr + ') is DOWN and NOT Responding to Pings" -NoNewLine\n';
powershellCodeBlock += '}\n';

System.log("Dispatching PowerShell script to ping " + targetServerFqdnStr + " on port " + targetServerPortNum);

var psInvocationResults = psHostObj.invokeScript(powershellCodeBlock);

if (psInvocationResults.invocationState === 'Failed') {
    var errorLogsList = psInvocationResults.getErrors();
    var k;
    for (k = 0; k < errorLogsList.length; k++) {
        var errorMsg = errorLogsList[k];
        System.error("PowerShell Engine Error: " + errorMsg);
    }
} else {
    var consoleOutputText = psInvocationResults.getHostOutput();
    // Clean up carriage returns or newlines from PowerShell host output
    consoleOutputText = consoleOutputText.replace(/[\r\n]/g, "");
    System.log("PowerShell Execution Result: " + consoleOutputText);
    
    // Store result back in the request object
    if (jsonRequestPayload.VirtualServers && jsonRequestPayload.VirtualServers[serverIndex]) {
        jsonRequestPayload.VirtualServers[serverIndex].PingResult = consoleOutputText;
    } else {
        System.warn("Unable to map result back to jsonRequestPayload at index: " + serverIndex);
    }
}

return null;
