$report = @()
foreach ($vm in Get-VM){
 $view = Get-View $vm -Property Name,Config,Parent,ParentVApp,Runtime,Guest,Summary,ResourceConfig,Storage
   if ($view.config.hardware.Device.Backing.ThinProvisioned -eq $true){
   $row = '' | select Name, Provisioned, Total, Used, VMDKs, Thin
      $row.Name = $vm.Name
      $row.Provisioned = [math]::round($vm.ProvisionedSpaceGB , 2)
      $row.Total = [math]::round(($view.config.hardware.Device | Measure-Object CapacityInKB -Sum).sum/1048576 , 2)
      $row.Used = [math]::round($vm.UsedSpaceGB , 2)
      $row.VMDKs = $view.config.hardware.Device.Backing.Filename | Out-String
      $row.Thin = $view.config.hardware.Device.Backing.ThinProvisioned | Out-String
   $report += $row
}}
$report | Sort Name | Export-Csv -Path "C:\Users\A631028.devdpc\Desktop\Thin_Disks.csv"