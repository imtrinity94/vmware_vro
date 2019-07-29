$vcloudhost = ""

# Load cloud module from VMware
try {import-module VMware.VimAutomation.Cloud} catch {}

# Connect to 
connect-ciserver $vcloudhost

# Get all organisations
$orgs = get-org
foreach ($o in $orgs)
{
	$orgview = $o | get-ciview
	# If SAML is not configured
	if ($orgview.Settings.OrgFederationSettings.Enabled -match "False")
	{
		# Regenerate the certificate and get the new expiration date
		$orgview.Settings.OrgFederationSettings.RegenerateFederationCertificate()
		$orgview = $o | get-ciview
		write-host "Updated certificate on org"$o.Name", Certificate expiration:"$orgview.Settings.OrgFederationSettings.CertificateExpiration
	}
	else
	{
		# Else notify that the organisation is using SAML
		write-host "SAML enabled on org"$o.Name", not touching federation regeneration"
	}
}
