/**
 * Define Type
 *
 * @param {DynamicTypes:DynamicNamespaceDefinition} namespace
 * @param {string} typeName
 * @param {ResourceElement} icon
 * @param {Array/string} props
 * @param {string} findByIdBindingType
 * @param {Action} findByIdBindingAction
 * @param {Workflow} findByIdBindingWorkflow
 * @param {string} findAllBindingType
 * @param {Action} findAllBindingAction
 * @param {Workflow} findAllBindingWorkflow
 * @param {string} hasChildrenInRelationBindingType
 * @param {Action} hasChildrenInRelationBindingAction
 * @param {Workflow} hasChildrenInRelationBindingWorkflow
 * @param {string} findRelationBindingType
 * @param {Action} findRelationBindingAction
 * @param {Workflow} findRelationBindingWorkflow
 * @param {boolean} generateWorkflowStubs
 * @param {WorkflowCategory} workflowStubsCategory
 * @return {DynamicTypes:DynamicTypeDefinition} actionResult
 */
// Validate and post-process input values
if (typeName == null || typeName.trim().length == 0) {
  throw "Undefined type: type cannot be null or empty";
}

var namespaceName = namespace.name;
typeName = typeName.trim();
var iconResName = icon.getResourceElementCategory().path + "/" + icon.name;

// Define type
var typeDef = DynamicTypesManager.defineType(namespaceName, typeName, iconResName, props);
if (typeDef == null) {
  throw "Failed to create dynamic type: " + namespaceName + "." + typeName;
}

// Setup finder methods
if (generateWorkflowStubs) {
  System.log("Generating workflow stubs for dynamic type: " + typeDef);
  var ids = DynamicTypesManager.generateTypeFinderMethods(typeDef.namespace, typeDef.name, workflowStubsCategory);
  DynamicTypesManager.bindTypeFinderMethods(typeDef.namespace, typeDef.name, ids[0], ids[1], ids[2], ids[3]);
} else {
  var findByIdBindingName;
  var findAllBindingName;
  var hasChildrenInRelationBindingName;
  var findRelationBindingName;

  if (findByIdBindingType == "action") {
    findByIdBindingName = findByIdBindingAction.module.name + "/" + findByIdBindingAction.name;
  } else {
    findByIdBindingName = findByIdBindingWorkflow.id;
  }
  if (findAllBindingType == "action") {
    findAllBindingName = findAllBindingAction.module.name + "/" + findAllBindingAction.name;
  } else {
    findAllBindingName = findAllBindingWorkflow.id;
  }
  if (hasChildrenInRelationBindingType == "action") {
    hasChildrenInRelationBindingName = hasChildrenInRelationBindingAction.module.name + "/" + hasChildrenInRelationBindingAction.name;
  } else {
    hasChildrenInRelationBindingName = hasChildrenInRelationBindingWorkflow.id;
  }
  if (findRelationBindingType == "action") {
    findRelationBindingName = findRelationBindingAction.module.name + "/" + findRelationBindingAction.name;
  } else {
    findRelationBindingName = findRelationBindingWorkflow.id;
  }

  DynamicTypesManager.bindTypeFinderMethods(typeDef.namespace, typeDef.name, findByIdBindingName, findAllBindingName, hasChildrenInRelationBindingName, findRelationBindingName);
}

System.log("Created dynamic type: " + typeDef.name);

actionResult = typeDef;
