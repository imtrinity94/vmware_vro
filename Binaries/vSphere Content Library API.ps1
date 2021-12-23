
# Variables
# vCenter
$vCenter = "192.168.7.10"
$admin = "administrator@vsphere.local"  
$password = ConvertTo-SecureString -String "VMware1!" -AsPlainText -Force
# Content Library
$Content_Library = "Content-Library"
$Item_Name = "VMware-NSX-Manager-6.3.3-6276725"
# NSX Deploy settings
$Folder_Name = "NSX_Test"
$Host_Name = "192.168.7.1"
$resourcepool_Name = "Resources"
$Datastore_Name = "vsanDatastore"
$NSX_VM_Name = "TESTNSX"
$NSX_StatIP = "192.168.7.50"
$NSX_GW = "192.168.7.254"

# Creds
$Credential = New-Object -TypeName "System.Management.Automation.PSCredential" -ArgumentList $admin, $password

# SSL prompt disregard
if (-not ([System.Management.Automation.PSTypeName]'ServerCertificateValidationCallback').Type)
{
$certCallback=@"
using System;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
public class ServerCertificateValidationCallback
{
public static void Ignore()
{
if(ServicePointManager.ServerCertificateValidationCallback ==null)
{
ServicePointManager.ServerCertificateValidationCallback +=
delegate
(
Object obj,
X509Certificate certificate,
X509Chain chain,
SslPolicyErrors errors
)
{
return true;
};
}
}
}
"@
Add-Type $certCallback
}
[ServerCertificateValidationCallback]::Ignore();



$auth = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($Credential.UserName+':'+$Credential.GetNetworkCredential().Password))
$head = @{
'Authorization' = "Basic $auth"
}

$authuri = "https://$($vCenter)/rest/com/vmware/cis/session"

#Authenticate against vCenter
$r = Invoke-WebRequest -Uri $authuri -Method Post -Headers $head
$token = (ConvertFrom-Json $r.Content).value
write-host "vCenter Authentication Token:" -Foregroundcolor yellow
write-host "$($token)"
$session = @{'vmware-api-session-id' = $token}

# Get library GUID
$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/com/vmware/content/library" -Method Get -Headers $session
$libraries = (ConvertFrom-Json $request.Content).value
write-host "Library overview:" -Foregroundcolor yellow
# Loop through all libraries and find the one we need
ForEach ($library in $libraries) {
    $request = invoke-WebRequest -Uri "https://$($vCenter)/rest/com/vmware/content/library/id:$($library)" -Method Get -Headers $session
    $libraryObject = (ConvertFrom-Json $request.Content).value
    write-host "Library name:" -Foregroundcolor yellow
    write-host "$($libraryObject.name)"
    If ($libraryObject.name -eq $Content_Library) {
        $LibraryID = $libraryObject.id
        break
    }
}

# Get library items
$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/com/vmware/content/library/item?library_id=$($LibraryID)" -Method Get -Headers $session
$items = (ConvertFrom-Json $request.Content).value
# Loop through all library items and find the one we need
write-host "Item overview in library: $($libraryObject.name)" -Foregroundcolor yellow
ForEach ($item in $items) {
    $request = invoke-WebRequest -Uri "https://$($vCenter)/rest/com/vmware/content/library/item/id:$($item)" -Method Get -Headers $session
    $itemObject = (ConvertFrom-Json $request.Content).value
    write-host "$($itemObject.name)"
    If ($itemObject.name -eq $Item_Name) {
        $NSX_ID = $item
        write-host "NSX ID returned from the Content Library:" -Foregroundcolor yellow
        write-host "$($NSX_ID)"
        break
    }
}

# To get the Ovf properties we need three props Folder, Host and ResourcePool
# Get Folder id
$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/vcenter/folder" -Method Get -Headers $session
$Folders = (ConvertFrom-Json $request.Content).value
# Loop through all folders and find the one we want our ovf deployed to
ForEach ($folder in $Folders){
    If ($folder.name -eq $Folder_Name){
        $Folder_ID = $folder.folder
    }
}

# Get host id
$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/vcenter/host" -Method Get -Headers $session
$Hosts = (ConvertFrom-Json $request.Content).value
# Loop through all hosts and find the one we want our ovf deployed to
ForEach ($targethost in $Hosts){
    If ($targethost.name -eq $Host_Name){
        $Host_ID = $targethost.host
    }
}

# Get resourcepool id
$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/vcenter/resource-pool" -Method Get -Headers $session
$ResourcePools = (ConvertFrom-Json $request.Content).value
ForEach ($resourcepool in $ResourcePools){
    If ($resourcepool.name -eq $resourcepool_Name){
        $ResourcePool_ID = $resourcepool.resource_pool
    }
}

write-host "To retrieve Ovf properties three parameters are needed:" -Foregroundcolor yellow
write-host "Folder ID:" -Foregroundcolor yellow
write-host "$($folder.folder)"
write-host "Host ID:" -Foregroundcolor yellow
write-host "$($targethost.host)"
write-host "Resource Pool ID:" -Foregroundcolor yellow
write-host "$($resourcepool.resource_pool)"

# Get Ovf properties
$body = "{`"target`": {`"folder_id`": `"$($Folder_ID)`", `"host_id`": `"$($Host_ID)`", `"resource_pool_id`": `"$($ResourcePool_ID)`"} }"
$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/com/vmware/vcenter/ovf/library-item/id:$($NSX_ID)?~action=filter" -Method Post -Headers $session -Body $body -ContentType application/json

$NSXOvfTemplate = (ConvertFrom-Json $request.Content).value
write-host "NSX Ovf config:"
write-host "$($NSXOvfTemplate)"

# To put the ovf properties we need a datastore ...
# Get datastore id
$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/vcenter/datastore" -Method Get -Headers $session
$Datastores = (ConvertFrom-Json $request.Content).value
ForEach ($datastore in $datastore){
    If ($datastore.name -eq $Datastore_Name){
        write "Datastore ID: $($datastore.datastore)"
        $Datastore_ID = $datastore.datastore
    }
}

# Put Ovf properties
#$bodyObject = (ConvertFrom-Json $body)

#$request = invoke-WebRequest -Uri "https://$($vCenter)/rest/com/vmware/vcenter/ovf/library-item/id:$($NSX_ID)?~action=filter" -Method Post -Headers $session -Body $body -ContentType application/json

#$NSXOvfTemplate = (ConvertFrom-Json $request.Content).value
#write-host "NSX Ovf config: $($NSXOvfTemplate)"
