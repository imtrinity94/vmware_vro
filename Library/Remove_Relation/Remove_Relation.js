/**
 * Remove Relation
 *
 * @param {DynamicTypes:DynamicTypeDefinition} parentType
 * @param {DynamicTypes:DynamicTypeDefinition} childType
 */
if (parentType == null) {
  throw "Undefined parent type: parentType cannot be null or empty!";
}
if (childType == null) {
  throw "Undefined child type: childType cannot be null or empty!";
}

DynamicTypesManager.removeRelation(parentType.id, childType.id);

System.log("Removed relation from: " + parentType.name + " to: " + childType.name);
