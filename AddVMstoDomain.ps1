#########################################
# Title:	     Add VMs to Domain		#
# Filename:	     AddVMstoDomain.ps1		#      	
# Created by:	 Mayank Goyal			#			
# Date:		     07 July 2018			#		
# Version:       1.0					#
#########################################

# Add required snap-ins (Can be run on Powershell ISE)
Add-PSSnapin VMware*

#Connect to vCenter
Connect-VIserver adevlgre4vcs001 -user A631028@iaccp1.local -password Qwerty123

#Gathers all VMs in a particular folder
$vms = Get-Folder -Name Apprenda | Get-VM

#The first IP from the IP Range to be assigned to all the VMs
$startIP = "10.0.1.35"

$counterIP = $startIP.Split(".")[3]

#Gateway Ip fetched from IP Range
$newGateWay = $startIP.Split(".")[0]+"."+$startIP.Split(".")[1]+"."+$startIP.Split(".")[2]+".1"

$cred = Get-Credential Administrator

foreach($vm in $vms) {
	$hostname = Get-vm $vm | Format-Table -Property name
	$newIP = $startIP.Split(".")[0]+"."+$startIP.Split(".")[1]+"."+$startIP.Split(".")[2]+"."+$counterIP
	
	$cmdhostname = "netdom renamecomputer /newname:$hostname"
	$cmdIP = "netsh interface ipv4 set address name=`"Ethernet`" static $newIP 255.255.255.0 $newGateWay"
	$cmdDNS1 = "netsh interface ipv4 set dns name=`"Ethernet`" static 8.8.8.8"
	$cmdDNS2 = "netsh interface ip add dns name=`"Ethernet`" 8.8.4.4 index=2"
	 
	$vm = Get-VM $hostname
	
	Invoke-VMScript -VM $vm -ScriptType Bat -ScriptText $cmdhostname -Verbose -GuestCredential $cred
	Invoke-VMScript -VM $vm -ScriptType Bat -ScriptText $cmdIP -Verbose -GuestCredential $cred
	Invoke-VMScript -VM $vm -ScriptType Bat -ScriptText $cmdDNS1 -Verbose -GuestCredential $cred
	Invoke-VMScript -VM $vm -ScriptType Bat -ScriptText $cmdDNS2 -Verbose -GuestCredential $cred
	
	$counterIP++
}