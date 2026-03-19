/**
 * Export Configuration
 *
 * @param {Array/DynamicTypes:DynamicNamespaceDefinition} namespaces
 * @return {Package} result
 */
result = DynamicTypesManager.exportConfigurationAsPackage(namespaces);
if (result != null) {
  System.log("Configuration exported as package '" + result.name + "'.");
} else {
  throw new Error("Configuration not exported.");
}
