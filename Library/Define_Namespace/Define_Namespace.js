/**
 * Define Namespace
 *
 * @param {string} namespace
 * @return {DynamicTypes:DynamicNamespaceDefinition} actionResult
 */
// Validate input values
if (namespace == null || namespace.trim().length == 0) {
  throw "Undefined namespace: namespace cannot be null or empty";
}

// Define namespace
var namespaceDef = DynamicTypesManager.defineNamespace(namespace);

System.log("Created dynamic namespace: " + namespaceDef);

actionResult = namespaceDef;
