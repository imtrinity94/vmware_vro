#==========================================================================
#
# Powershell Source File 
#
# NAME: Virtual_Machine_Compute_Optimizer.ps1, v1.0.4
#
# COMMENT: Gets all VMs and calculates the optimal CPU Sockets and Cores
#          based on the Host sockets & cores
#
#==========================================================================

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#////////////////////DIMENSION & DECLARE VARIABLES////////////////////////
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$defaultPath = "$PSScriptRoot\VMCO_Report.csv"
$powerCLIModule = "VMware.VimAutomation.Core"
$minPSVer = 5
$vmFilter = @{"Runtime.PowerState" = "poweredOn"; "Runtime.ConnectionState" = "connected"; "Config.Template" = "False"}
$hostFilter = @{"Runtime.PowerState" = "poweredOn"; "Runtime.ConnectionState" = "connected"}


#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#////////////////////////////FUNCTIONS ///////////////////////////////////
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Function Import_Update_Module($moduleName) 
{
    #Test to see if Module Exists
    Try
    {
        $installedVersion = Get-InstalledModule -Name $moduleName | select -ExpandProperty Version | Measure-Object -Maximum | select -expand Maximum -ErrorAction Stop
        $installedVersion = "$($installedVersion.Major).$($installedVersion.Minor).$($installedVersion.Build).$($installedVersion.Revision)"
        If ($installedVersion -eq $null) 
        {
            Write-Host "$moduleName is not installed. Type 'Y' to install module, or 'N' to skip: " -ForegroundColor Yellow -NoNewline
            Do
            {
                $choice = Read-Host
                Switch ($choice)
                {
                    "Y" {$action = "Install"}
                    "N" {$action = "Module Not Installed"; return $action}
                    default {Write-Host "Invalid choice. Please type 'Y' or 'N': " -ForegroundColor Yellow -NoNewline; $action = "Invalid"}
                }
            }
            Until ($action -ne "Invalid")
        }
        Else
        {
            $currentVersion = Find-module -name $moduleName | select -expand Version -ErrorAction Stop
            $currentVersion = "$($currentVersion.Major).$($currentVersion.Minor).$($currentVersion.Build).$($currentVersion.Revision)"
            If ($currentVersion -gt $installedVersion)
            {
                Write-Host "A newer version of $moduleName is available. Type 'Y' to update module to $currentVersion or 'N' to continue with current version $($installedVersion): " `
                    -ForegroundColor Yellow -NoNewline
                Do
                {
                    $choice = Read-Host
                    Switch ($choice)
                    {
                        "Y" {$action = "Update"}
                        "N" {$action = "$moduleName Module Update Skipped"; return $action}
                        default {Write-Host "Invalid choice. Please type 'Y' or 'N': " -ForegroundColor Yellow -NoNewline; $action = "Invalid"}
                    }
                }
                Until ($action -ne "Invalid")
            }
            Else 
            {
                return "$moduleName already installed and updated"
            }
        }
    }
    Catch
    {
        Return "ERROR: Failed to detect $moduleName module: $($_.exception.Message)" 
    }
    #Install or update depending on status and choice  
    Try
    {
        Switch ($action)
        {
            "Install"
            {
                Import-Module -name $moduleName -Scope CurrentUser -Force -ErrorAction Stop
            }
            "Update"
            {
                Update-Module -name $moduleName -Confirm:$false -ErrorAction Stop
            } 
        }
        Return "SUCCESS: Completed $action of $moduleName."
    }
    Catch
    {
        Return "ERROR: Could not $action $($moduleName): $($_.exception.Message)"
    }
}
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Function Set_MultivCenterMode()
{
    $userMulti = Get-PowerCLIConfiguration -Scope User | Select -ExpandProperty DefaultVIServerMode
    If ($userMulti -ne "Multiple")
    {
        Try
        {
            Set-PowerCLIConfiguration -DefaultVIServerMode Multiple -Scope User -Confirm:$false
            Write-host "Changed DefaultVIServerMode to Multiple" -ForegroundColor Green
            Return "SUCCESS"
        }
        Catch
        {
            Write-Host "Error changing DefaultVIServerMode to Multiple: $($_.Exception.Message )" -ForegroundColor Red
            Return "ERROR"
        }
    }
    Else
    {
        Write-Host "DefaultVIServerMode is already set to Multiple" -ForegroundColor Green
        Return "SUCCESS"
    }
}
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Function Get_Optimal_CPU($vmSockets,$vmCoresPerSocket,$vmMemoryGB,$hostSockets,$hostCoresPerSocket,$hostMemoryGB)
{    
    Try
    {
        $vmCPUs = $vmSockets * $vmCoresPerSocket
        $memPerChannel = $hostMemoryGB / $hostSockets
        #accounts for odd # of vCPUs
        If(($vmCPUs % 2 -ne 0) -and ($vmCPUs -gt 1)) 
        {
            $vmCPUs = $vmCPUs + 1
        }
    
        #calculations if VM Memory is less than the per NUMA channel memory
        If ($vmMemoryGB -le ($memPerChannel))
        {
            $i = 0
            Do 
            {
                $i++
            }
            Until (($vmCPUs -le ($hostCoresPerSocket) * $i) -or ($hostSockets -eq $i))
            $optSockets = $i
            $optCores = $vmCPUs / $i
        }
        Else # if VM Memory is > memory per channel
        {
            $i = 1
            Do 
            {
                $i++
            }
            Until ((($vmMemoryGB / $i) -lt $memPerChannel) -and ((($vmCPUs / $i)  % 2) -eq 0) -or ($hostSockets -eq $i) -or ($vmCPUs / $i -eq 1))
            $optSockets = $i
            $optCores = $vmCPUs / $optSockets
        }
            $objOptCPU = [pscustomobject]@{
            OptimalSockets = $optSockets;
            OptimalCores   = $optCores
            } #end pscustomobject
    }
    Catch
    {
        $objOptCPU = "ERROR: $($_.Exception.Message)"
    }
    Return $objOptCPU

}
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#///////////////////////////////CODE BODY ////////////////////////////////
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$psVer = [string]$PsVersionTable.PSVersion.major + "." + [string]$PsVersionTable.PSVersion.Minor + `
		"." + [string]$PsVersionTable.PSVersion.Build + "." + [string]$PsVersionTable.PSVersion.Revision
If($psVer -lt $minPSVer)
{
    Write-Host "Powershell version is at $psVer.  It must be at a minimum of version 5 to run this script properly. `
    Please update and re-run this script." -ForegroundColor Red
    pause; break
}

Write-Host "Enter the path for the CSV Report, or press <enter> to accept the default path: `
    $($defaultPath): " -ForegroundColor Yellow -noNewline
$outPutFile = Read-Host

If ($outPutFile -eq "")
{
    $outPutFile = $defaultPath
}

#checks to see if outPutFile already exists
If (test-path $outPutFile)
{
    Write-Host "*** $outPutFile already exists!  New data will be appended to this report! ***" -ForegroundColor Red
}

Write-Host "Checking for $powerCLIModule module" -ForegroundColor Yellow
$powerCLIResult = Import_Update_Module $powerCLIModule
If ($powerCLIResult -match ("ERROR" -or "Not Installed"))
{
    Write-Host "$($powerCLIResult). Script will exit." -ForegroundColor Red
    pause; break 
}
Else 
{
    Write-Host "$powerCLIResult" -ForegroundColor Green
}

Write-Host "Type vCenter Server FQDNs Separated by a comma. `
    IE: 'vcenter1.domain.com,vcenter2.domain.com': " -foregroundcolor Yellow -noNewline
$vCenters = Read-Host 

$vCenters = $vCenters.Split(",").Trim()

#sets Multi vCenter mode if > 1 vCenter

If ($vCenters.Count -gt 1)
{
    $multiVCResult = Set_MultivCenterMode
    If($multiVCResult -eq "ERROR")
    {
        "Script will exit"
        pause; break 
    }
}

$creds = Get-Credential -Message "Enter credentials to connect to vCenter Servers"

Try 
{
    Connect-VIServer $vCenters -credential $creds -ErrorAction Stop
    Remove-Variable creds
}    
Catch
{
   Write-Host "Error connecting to vCenter Servers: $vcenters" -ForegroundColor Red
   Write-Host $_.Exception.Message -ForegroundColor Red
   Remove-Variable creds
   pause; break 
}

#gets info from all hosts
Write-Host "Collecting Host Information.  Skipping Powered Off and Disconnected Hosts" -ForegroundColor Green
  
$vmHosts = get-view -ViewType HostSystem -Filter $hostFilter -Property Name,Config.Product.Version,Hardware.MemorySize,Hardware.CpuInfo,Config.PowerSystemInfo.CurrentPolicy.Key | select Name,@{n='Id';e={$_.MoRef}},@{n='Version';
    e={$_.Config.Product.Version}},@{n='vCenter';e={([uri]$_.Client.serviceurl).Host}},@{n='MemoryGB';
    e={[int](($_.Hardware.MemorySize)/1073741824)}},@{n='HostSockets'; e={($_.Hardware.CpuInfo.NumCpuPackages)}},@{n='CoresPerSocket';
    e={($_.Hardware.CpuInfo.NumCPUCores)/$($_.Hardware.CpuInfo.NumCpuPackages)}},@{n='HostPowerPolicy'; 
    e={
        switch($_.Config.PowerSystemInfo.CurrentPolicy.Key)
        {
            "1" {"HighPerformance"}
            "2" {"Balanced"}
            "3" {"LowPower"}
            "4" {"Custom"}
        }
      }
    }

#gets VM information
Write-Host "Collecting VM Information.  Skipping Powered Off, Disconnected, or Template VMs" -ForegroundColor Green 

$vms = get-view -ViewType VirtualMachine -Filter $vmFilter -Property Name,Config.Hardware.MemoryMB,Config.Hardware.NumCPU,Config.Hardware.NumCoresPerSocket,Runtime.Host | select Name, @{n='MemoryGB';
    e={[int](($_.Config.Hardware.MemoryMB)/1024)}},@{n='Sockets';e={($_.Config.Hardware.NumCPU)/($_.Config.Hardware.NumCoresPerSocket)}},@{n='CoresPerSocket'; 
    e={$_.Config.Hardware.NumCoresPerSocket}},@{n='NumCPU';e={$_.Config.Hardware.NumCPU}},@{n='VMHostId';e={$_.Runtime.Host}},@{n='vCenter';e={([uri]$_.client.ServiceUrl).Host}}

$vmCount = $vms.Count
$i = 1
foreach ($vm in $vms)
{
    $vmsPercent = [math]::Round(($i / $vmCount) * 100)
    Write-Progress -Activity "Querying VMs" -Status "$vmsPercent% Complete:" -PercentComplete $vmsPercent -CurrentOperation "Current VM: $($vm.Name)"
    $vmHost = $vmHosts | where {$_.vCenter -eq $($vm.vCenter) -and $_.Id -eq $($vm.VMHostId)} | select -first 1
    If ($vmHost -ne $null)
    {
        $optCPU = Get_Optimal_CPU $vm.Sockets $vm.CoresPerSocket $vm.MemoryGB $vmHost.HostSockets $vmHost.CoresPerSocket $vmHost.MemoryGB
        If ($optCPU -ne "ERROR")
        {
            If (($($optCPU.OptimalSockets) -eq $($vm.sockets)) -and ($($optCPU.OptimalCores) -eq $($vm.CoresPerSocket)))
            {
                $vmCpusOptimized = "YES"
            }
            Else
            {
                $vmCpusOptimized = "NO"
            }

            $objHostInfo = [pscustomobject]@{
                vCenter            = $($vmHost.vCenter);
                HostName	       = $($vmHost.Name);
                ESXi_Version       = $($vmHost.Version);
                HostSockets        = $($vmHost.HostSockets);
                HostCoresPerSocket = $($vmHost.CoresPerSocket);
                HostMemoryGB       = $($vmHost.MemoryGB);
                HostPowerPolicy    = $($vmHost.HostPowerPolicy);
                VMName             = $($vm.Name);
                VMNumSockets       = $($vm.Sockets);
                VMCoresPerSocket   = $($vm.CoresPerSocket);
                vCPUs              = $($vm.NumCPU);
                VMMemoryGB         = $($vm.MemoryGB);
                VMCPUsOptimized    = $vmCpusOptimized;
                OptimalSockets     = $($optCPU.OptimalSockets);
                OptimalCores       = $($optCPU.OptimalCores)
            } #end pscustomobject

            Try
            {
                $objHostInfo | export-csv -Path $outPutFile -NoTypeInformation -Append -ErrorAction Stop
            }
            Catch
            {
                Write-Host "Error writing to output file $outPutFile" -ForegroundColor Red
                Write-Host $_.Exception.Message -ForegroundColor Red
                pause; break 
            }
        }
        Else
        {
            Write-Host "Error calculating optimal vCPUs for VM: $($vm.Name) on Host: $($vm.VMHost) `
                $optCPU" -ForegroundColor Red
        }
    } # end if
    Else
    {
        Write-Host "Skipping $($vm.Name) since its host ($($vm.vmHost)) could not be matched" -ForegroundColor Yellow
    }
    $i++
}

Write-Progress -Activity "Querying VMs" -Completed

foreach ($vCenter in $vCenters)
{
    Disconnect-VIServer $vCenter -Confirm:$false -Force
}

Write-Host "Analysis complete.  Please check report at $outPutFile" -ForegroundColor Green
pause; break
