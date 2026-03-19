/**
 * Remove Namespace
 *
 * @param {DynamicTypes:DynamicNamespaceDefinition} namespace
 */
// Validate and post-process input values
if (namespace == null || namespace.name.trim().length == 0) {
  throw "Undefined namespace: namespace cannot be null or empty";
}

var namespaceName = namespace.name.trim();

// Remove namespace and its types
var namespaceDef = DynamicTypesManager.removeNamespace(namespaceName);

System.log("Removed dynamic namespace: " + namespaceName);
