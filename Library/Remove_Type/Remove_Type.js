/**
 * Remove Type
 *
 * @param {DynamicTypes:DynamicTypeDefinition} type
 */
// Validate and post-process input values
if (type == null) {
  throw "Undefined type: type cannot be null or empty";
}

var fqTypeName = type.namespace + "." + type.name;

// Remove type
DynamicTypesManager.removeType(type.namespace, type.name);

System.log("Removed dynamic type: " + fqTypeName);
