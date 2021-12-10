#————————————————
# Start of script parameters section
#
# vCenter Server, vCenter Server username and vCenter Server password
$vcenter=”172.20.20.21“
$vcenteruser=”vcenter@system-domain“
$vcenterpw=”notsecret“
#
# vCenter Server folder where to place the ESXi host
$vcenterfolder=”ESXi-installation“
#
# ESXi host, ESXi host username, ESXi host password
$esxi=”esxi01.home.test“
$esxiuser=”root“
$esxipw=”notsecret“
#
# License name
$licensename=“VMware vSphere 5 Enterprise Plus”
#
# End of script parameter section
#——————————————–
#
#
#  Set the ESXi host license to Evaluation license and disconnect from the ESXi host
connect-viserver $esxi -user $esxiuser -password $esxipw
$lm = Get-View -Id ‘LicenseManager-ha-license-manager’
$lm.UpdateLicense(“00000-00000-00000-00000-00000”, $null)
disconnect-viserver $esxi -confirm:$false
#
#
# Connect to vCenter Server
connect-viserver $vcenter -user $vcenteruser -password $vcenterpw
#
#
# Add the ESXi host to the vCenter Server
add-vmhost -name $esxi -Location $vcenterfolder -user $esxiuser -password $esxipw –force
#
#
# Configure the vCenter Server provided license for the ESXi host and disconnect from vCenter Server
$servInst = Get-View ServiceInstance
$licMgr = Get-View $servInst.Content.licenseManager
$licAssignMgr = Get-View $licMgr.licenseAssignmentManager
function Get-LicenseKey($LicName)
{
 $licenses = $licMgr.Licenses | where {$_.Name -eq $LicName}
 foreach ($license in $licenses) {
 if ( (($license.Total – $license.Used) -ne “0”) -or (($license.Total – $license.Used) -lt “0”) )  {
 return $license.LicenseKey
 break
 }
 }
}
function Get-VMHostId($Name)
{
 $vmhost = Get-VMHost $Name | Get-View
 return $vmhost.Config.Host.Value
}
function Set-LicenseKey($VMHostId, $LicKey, $Name)
{
 $license = New-Object VMware.Vim.LicenseManagerLicenseInfo
 $license.LicenseKey = $LicKey
 $licAssignMgr.UpdateAssignedLicense($VMHostId, $license.LicenseKey, $Name)
}
function Get-License($VMHostId)
{
 $details = @()
 $detail = “” |select LicenseKey,LicenseType,Host
 $license = $licAssignMgr.QueryAssignedLicenses($VMHostId)
 $license = $license.GetValue(0)
 $detail.LicenseKey = $license.AssignedLicense.LicenseKey
 $detail.LicenseType = $license.AssignedLicense.Name
 $detail.Host = $license.EntityDisplayName
 $details += $detail
 return $details
}
$LicKey = Get-LicenseKey -LicName $licensename
$VMHostId = Get-VMHostId -Name $esxi
Set-LicenseKey -LicKey $LicKey -VMHostId $VMHostId -Name $null
#
disconnect-viserver $vcenter  -confirm:$false
