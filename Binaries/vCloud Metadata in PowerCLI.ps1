Function New-CIMetaData { 
    <# 
    .SYNOPSIS 
        Creates a Metadata Key/Value pair. 
    .DESCRIPTION 
        Creates a custom Metadata Key/Value pair on a specified vCloud object 
    .PARAMETER  Key 
        The name of the Metadata to be applied.
    .PARAMETER  Value
        The value of the Metadata to be applied, the string 'Now' can be used
        for the current date/time for values using the 'DateTime' type.
    .PARAMETER  Visibility
        The visibility of the Metadata entry (General, Private, ReadOnly)
    .PARAMETER  Type
        The type of the Metadata entry (String, Number, DateTime, Boolean)
        (these correspond to the types of: MetadataStringValue,
        MetadataNumberValue, MetadataDateTimeValue or MetadataBooleanValue
        respectively)
    .PARAMETER  CIObject
        The object on which to apply the Metadata.
    .EXAMPLE
        New-CIMetadata -Key "Owner" -Value "Alan Renouf" -CIObject (Get-Org Org1)
        Creates a new metadata value "Alan Renouf" in a key "Owner" on the Org1 object.
    .EXAMPLE
        New-CIMetadata -Key "Company" -Value "ABC Corp" -Visibility READONLY -CIObject (Get-CIVM 'client')
        Creates a new metadata value "ABC Corp" in a key "Company" on the 'client' VM object with the READONLY attribute set preventing changes by non-system users.
    .EXAMPLE
        New-CIMetadata -Key "Backup" -Value $false -Visibility Private -Type Boolean -CIObject (Get-CIVapp 'testvapp')
        Creates a new hidden metadata value $false in a key "Backup" on the vApp object with the 'Private' attribute set preventing visibility to non-system users.
    .NOTES
        NAME: Get-CIMetaData
        AUTHOR: Jon Waite based on code by Alan Renouf
        LASTEDIT: 2016-02-23
        KEYWORDS: metadata set vcloud director
    #Requires -Version 2.0
    #> 
     [CmdletBinding( 
         SupportsShouldProcess=$true, 
        ConfirmImpact="High" 
    )] 
    param( 
        [parameter(Mandatory=$true,ValueFromPipeline=$true,ValueFromPipelineByPropertyName=$true)] 
            [PSObject[]]$CIObject, 
        [parameter(Mandatory=$true)]
            [String]$Key,
        [parameter(Mandatory=$true)]
            $Value,
        [ValidateSet('General','Private','ReadOnly')]
            [String]$Visibility = 'General',
        [ValidateSet('String','Number','DateTime','Boolean')]
            [String]$Type = "String"
        ) 
    Process { 
        Foreach ($Object in $CIObject) { 
            $Metadata = New-Object VMware.VimAutomation.Cloud.Views.Metadata 
            $Metadata.MetadataEntry = New-Object VMware.VimAutomation.Cloud.Views.MetadataEntry 
            
            $Metadata.MetadataEntry[0].Key = $Key

            switch($Type) {
              'String'   { $Metadata.MetadataEntry[0].TypedValue = New-Object VMware.VimAutomation.Cloud.Views.MetadataStringValue }
              'Number'   { $Metadata.MetadataEntry[0].TypedValue = New-Object VMware.VimAutomation.Cloud.Views.MetadataNumberValue }
              'DateTime' { $Metadata.MetadataEntry[0].TypedValue = New-Object VMware.VimAutomation.Cloud.Views.MetadataDateTimeValue }
              'Boolean'  { $Metadata.MetadataEntry[0].TypedValue = New-Object VMware.VimAutomation.Cloud.Views.MetadataBooleanValue }
            }

            if ($Type -eq 'DateTime' -and $Value -eq 'Now') {
                $Metadata.MetadataEntry[0].TypedValue.Value = [string](Get-Date).ToUniversalTime().GetDateTimeFormats('s')
            } else {
                $Metadata.MetadataEntry[0].TypedValue.Value = $Value
            }
            
            switch($Visibility) {
              'General'  { } #Default, don't need to change
              'Private'  { 
                $Metadata.MetadataEntry[0].Domain = New-Object VMware.VimAutomation.Cloud.Views.MetadataDomainTag
                $Metadata.MetadataEntry[0].Domain.Value = 'SYSTEM'
                $Metadata.MetadataEntry[0].Domain.Visibility = 'PRIVATE'
                }
              'ReadOnly' {
                $Metadata.MetadataEntry[0].Domain = New-Object VMware.VimAutomation.Cloud.Views.MetadataDomainTag
                $Metadata.MetadataEntry[0].Domain.Value = 'SYSTEM'
                $Metadata.MetadataEntry[0].Domain.Visibility = 'READONLY'
                }      
            }

            $Object.ExtensionData.CreateMetadata($Metadata) 
            ($Object.ExtensionData.GetMetadata()).MetadataEntry | Where {$_.Key -eq $key } | Select @{N="CIObject";E={$Object.Name}},
            @{N="Type";E={$_.TypedValue.GetType().Name}},
            @{N="Visibility";E={ if ($_.Domain.Visibility) { $_.Domain.Visibility } else { "General" }}},
            Key -ExpandProperty TypedValue
        } 
    } 
} 
Function Get-CIMetaData {
    <#
    .SYNOPSIS
        Retrieves all Metadata Key/Value pairs.
    .DESCRIPTION
        Retrieves all custom Metadata Key/Value pairs on a specified vCloud object
    .PARAMETER  CIObject
        The object on which to retrieve the Metadata.
    .PARAMETER  Key
        The key to retrieve.
    .EXAMPLE
        Get-CIMetadata -CIObject (Get-Org Org1)
    #>
    param(
        [parameter(Mandatory=$true,ValueFromPipeline=$true,ValueFromPipelineByPropertyName=$true)]
            [PSObject[]]$CIObject,
            $Key
        )
    Process {
        Foreach ($Object in $CIObject) {
            If ($Key) {
                ($Object.ExtensionData.GetMetadata()).MetadataEntry | Where {$_.Key -eq $key } | Select @{N="CIObject";E={$Object.Name}},
                    @{N="Type";E={$_.TypedValue.GetType().Name}},
                    @{N="Visibility";E={ if ($_.Domain.Visibility) { $_.Domain.Visibility } else { "General" }}},
                    Key -ExpandProperty TypedValue
            } Else {
                ($Object.ExtensionData.GetMetadata()).MetadataEntry | Select @{N="CIObject";E={$Object.Name}},
                    @{N="Type";E={$_.TypedValue.GetType().Name}},
                    @{N="Visibility";E={ if ($_.Domain.Visibility) { $_.Domain.Visibility } else { "General" }}},
                    Key -ExpandProperty TypedValue
            }
        }
    }
}
Function Remove-CIMetaData {
    <#
    .SYNOPSIS
        Removes a Metadata Key/Value pair.
    .DESCRIPTION
        Removes a custom Metadata Key/Value pair on a specified vCloud object
    .PARAMETER  Key
        The name of the Metadata to be removed.
    .PARAMETER  CIObject
        The object on which to remove the Metadata.
    .EXAMPLE
        Remove-CIMetaData -CIObject (Get-Org Org1) -Key "Owner"
    #>
     [CmdletBinding(
         SupportsShouldProcess=$true,
        ConfirmImpact="High"
    )]
    param(
        [parameter(Mandatory=$true,ValueFromPipeline=$true,ValueFromPipelineByPropertyName=$true)]
            [PSObject[]]$CIObject,
            $Key
        )
    Process {
        $CIObject | Foreach {
            $metadataValue = ($_.ExtensionData.GetMetadata()).GetMetaDataValue($Key)
            If($metadataValue) { $metadataValue.Delete() }
        }
    }
}
