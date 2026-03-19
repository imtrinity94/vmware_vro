/**
 * Import Configuration
 *
 * @param {Array/String} namespaces
 * @param {MimeAttachment} file
 * @param {boolean} ignoreValidationWarnings
 * @return {boolean} result
 */
if (ignoreValidationWarnings || DynamicTypesManager.validateConfigurationPackage(file)) {
  result = DynamicTypesManager.importConfigurationFromPackage(namespaces, file);
  if (result) {
    System.log("Configuration imported from package '" + file.name + "'.");
  } else {
    throw new Error("Configuration not imported.");
  }
} else {
  System.log("Configuration not imported.");
  result = false;
}
