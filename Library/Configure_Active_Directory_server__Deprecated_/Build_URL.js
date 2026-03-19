/**
 * Build URL
 *
 * @param {boolean} confirmSslCertificateImport
 * @param {string} host
 * @param {number} port
 * @return {boolean} acceptAllCertificates
 * @return {string} url
 */
acceptAllCertificates = !confirmSslCertificateImport;
url = host + ':' + port;