/**
 * Define Relation
 *
 * @param {DynamicTypes:DynamicTypeDefinition} parentType
 * @param {DynamicTypes:DynamicTypeDefinition} childType
 * @param {string} relationName
 */
if (parentType == null) {
  throw "Undefined parent type: parentType cannot be null or empty!";
}
if (childType == null) {
  throw "Undefined child type: childType cannot be null or empty!";
}
if (parentType == childType) {
  throw "Bad relation: childType cannot be the same as parentType!";
}
if (relationName == null || relationName.trim().length == 0) {
  throw "Undefined relation: relationName cannot be null or empty!";
}

DynamicTypesManager.defineRelation(parentType.id, childType.id, relationName.trim());

System.log("Created relation: " + relationName + " from: " + parentType.name + " to: " + childType.name);
