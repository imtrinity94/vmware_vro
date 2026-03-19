/**
 * Update Namespace
 *
 * @param {DynamicTypes:DynamicNamespaceDefinition} namespace
 * @param {string} name
 * @return {DynamicTypes:DynamicNamespaceDefinition} result
 */
// Validate and post-process input values
if (namespace == null || namespace.name.trim().length == 0) {
  throw "Undefined namespace: namespace cannot be null or empty";
}
if (name == null || name.trim().length == 0) {
  throw "Undefined namespace: name cannot be null or empty";
}

var oldName = namespace.name.trim();
var newName = name.trim();

if (oldName == newName) {
  result = namespace;
  System.log("Dynamic namespace " + oldName + " not updated");
} else {
  // Remove namespace and its types
  result = DynamicTypesManager.updateNamespace(oldName, newName);
  System.log("Updated dynamic namespace " + oldName + " --> " + newName);
}
