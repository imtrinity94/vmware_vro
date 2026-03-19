/**
 * Configure Mail
 *
 * @param {string} fromAddress - [object Object]
 * @param {string} fromName - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {string} smtpHost - [object Object]
 * @param {number} smtpPort - [object Object]
 * @param {string} username - [object Object]
 */

var sid = ConnectionManager.save(smtpHost, smtpPort, username, password, fromAddress, fromName);

System.log("Configuration created successfully");