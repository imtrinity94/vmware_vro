/**
 * Generate Package Signing Certificate
 *
 * @param {string} commonName
 * @param {string} organization
 * @param {string} organizationalUnit
 * @param {string} countryCode
 * @param {string} signatureAlgorithm
 */
var action = new ConfiguratorGeneratePackageSigningCertificateAction();

action.setCommonName(commonName);
action.setOrganization(organization);
action.setOrganizationalUnit(organizationalUnit);
action.setCountryCode(countryCode);
action.setSignatureAlgorithm(signatureAlgorithm);

var msg = action.validate();
if (msg) {
    throw msg;
}

msg = action.execute();
if (msg) {
    throw msg;
}
