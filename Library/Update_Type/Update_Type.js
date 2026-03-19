/**
 * Update Type
 *
 * @param {DynamicTypes:DynamicTypeDefinition} type
 * @param {DynamicTypes:DynamicNamespaceDefinition} newNamespace
 * @param {string} newType
 * @param {ResourceElement} newIcon
 * @param {Array/string} newProperties
 * @return {DynamicTypes:DynamicTypeDefinition} result
 */
// Validate and post-process input values
if (type == null) {
  throw "Undefined type: type cannot be null or empty";
}
if (newNamespace == null) {
  throw "Undefined namespace: newNamespace cannot be null or empty";
}
if (newType == null || newType.trim().length == 0) {
  throw "Undefined type: newType cannot be null or empty";
}

var oldName = type.namespace + "." + type.name;
var newName = newNamespace.name.trim() + "." + newType.trim();
var iconResName = newIcon == null ? null : newIcon.getResourceElementCategory().path + "/" + newIcon.name;

// Update type
result = DynamicTypesManager.updateType(type.namespace, type.name, newNamespace.name.trim(), newType.trim(), iconResName, newProperties);
System.log("Updated dynamic type " + oldName + " --> " + newName);
