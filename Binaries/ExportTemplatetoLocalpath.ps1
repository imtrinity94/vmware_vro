#####################################################
# Title:	     Export Templates to Local path		#
# Filename:	     ExportTemplatetoLocalpath.ps1		#      	
# Created by:	 Mayank Goyal						#			
# Date:		     16 July 2018						#		
# Version:       1.0								#
#####################################################

#if PowerCLI is using System Proxy, will reconfigure it to NoProxy to avoid bad connections with vCenter
Set-PowerCLIconfiguration -ProxyPolicy NoProxy

#Provide the vSphere name and Credentials
Connect-VIserver 

# Get all templates in $DefaultVIServer vCenter
$templates = Get-Template

foreach ($template in $templates) {
		
		# Convert each Template to VM because we cannot directly export templates
		Set-Template $template -ToVM -confirm:$False
		
		# Get the converted VM and export it to local path defined here
		Get-VM -Name $template | Export-VApp -Destination "D:\vCenter_Templates"
		
		# Convert this VM back to Template to avoid any changes to vCenter entities
		Get-VM -Name $template | Set-VM -ToTemplate -Confirm:$false
	}
} 