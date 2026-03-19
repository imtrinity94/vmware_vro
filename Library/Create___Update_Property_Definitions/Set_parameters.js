/**
 * Set parameters
 *
 * @param {vCACCAFE:VCACHost} host
 * @param {string} visibility
 * @param {boolean} enableUpdate
 * @param {Array/Any} attrPropertyDefinitions
 * @param {number} attrPropertyIndex
 * @return {string} attrObjectId
 * @return {string} attrDisplayName
 * @return {string} attrDescription
 * @return {string} attrTenantId
 * @return {number} attrOrderIndex
 * @return {string} attrTypeId
 * @return {string} attrControlType
 * @return {Array/string} attrPredefinedValues
 * @return {boolean} attrCustomAllowed
 * @return {boolean} attrRequiredProperty
 * @return {boolean} attrDoNotUpdate
 */
var currentProperty = attrPropertyDefinitions[attrPropertyIndex];
attrObjectId = currentProperty["name"];
attrDisplayName = currentProperty["label"] ? currentProperty["label"] : attrObjectId;
attrDescription = null;
attrTenantId = (visibility == "Host's tenant" ? host.tenant : null);
attrOrderIndex = attrPropertyIndex + 1;
attrTypeId = currentProperty["type"];
attrControlType = currentProperty["control"];
attrPredefinedValues = currentProperty["values"];
attrCustomAllowed = true;
attrRequiredProperty = currentProperty["required"];
attrDoNotUpdate = (enableUpdate == false);

