/**
 * Command Creation - Windows
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {string} nodeHostname - [object Object]
 * @param {string} factsJSON - [object Object]
 * @return {boolean} failed
 * @return {string} errorCode
 * @return {string} command
 */
if (factsJSON) {
    System.log("Creating vRA Puppet facts for " + nodeHostname);

        try {
            JSON.parse(factsJSON);
        }
        catch(err) {
            errorCode += 'factsJSON must be valid JSON string. ' + err + '.';
            throw errorCode;
        }
        var factsDir = 'C:\\ProgramData\\PuppetLabs\\facter\\facts.d';
        var factsFile = factsDir + '\\' + 'puppet_vra_facts.json';
        var oneLineFacts =  System.getModule("com.puppet.o11n.plugin.puppet.node").escapePowerShellValue(factsJSON.replace(/[\n\r]/g, ''));
        var command = "New-Item -path '" + factsDir + "' -type directory -force \n" +
                      "$MyPath = '" + factsFile + "' \n" +
                      "$MyFile = " + oneLineFacts + " \n" +
                      "$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding($False) \n" +
                      "[System.IO.File]::WriteAllLines($MyPath, $MyFile, $Utf8NoBomEncoding)";

}