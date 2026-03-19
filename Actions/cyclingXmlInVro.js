/**
 * @description Demonstrates how to build an XML body for an NSX Edge appliance using Properties
 *              as a placeholder map. Reads a template XML from a Resource Element and replaces
 *              all placeholder tokens with real values.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {ResourceElement} esgBodyResource - Resource Element containing the XML template body.
 * @param {string} esgName - Value for the {attXmlConfigName} placeholder.
 * @param {string} resourcePoolId - Value for the {attXmlConfigResourcePoolId} placeholder.
 * @param {string} datastoreId - Value for the {attXmlConfigDatastoreId} placeholder.
 * @param {string} nicName - Value for the {attXmlConfigNicName} placeholder.
 * @param {string} portgroupId - Value for the {attXmlConfigPortgroupId} placeholder.
 * @param {string} primaryAddress - Value for the {attXmlConfigPrimaryAddress} placeholder.
 * @param {string} subnetMask - Value for the {attXmlConfigSubnetMask} placeholder.
 * @param {string} userName - Value for the {attXmlConfigUserName} placeholder.
 * @param {string} password - Value for the {attXmlConfigPassword} placeholder.
 * @returns {void}
 */

var tokenMap = new Properties();
tokenMap.put("{attXmlConfigName}", esgName);
tokenMap.put("{attXmlConfigResourcePoolId}", resourcePoolId);
tokenMap.put("{attXmlConfigDatastoreId}", datastoreId);
tokenMap.put("{attXmlConfigNicName}", nicName);
tokenMap.put("{attXmlConfigPortgroupId}", portgroupId);
tokenMap.put("{attXmlConfigPrimaryAddress}", primaryAddress);
tokenMap.put("{attXmlConfigSubnetMask}", subnetMask);
tokenMap.put("{attXmlConfigUserName}", userName);
tokenMap.put("{attXmlConfigPassword}", password);

// Replace placeholders in XML template with real values
var xmlContent = esgBodyResource.getContentAsMimeAttachment().content;
var placeholderKeys = tokenMap.keys;

var i;
for (i = 0; i < placeholderKeys.length; i++) {
    var key = placeholderKeys[i];
    var val = tokenMap.get(key);
    // Replace all occurrences
    var regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    xmlContent = xmlContent.replace(regex, val);
}

// Result is typically stored in a workflow variable 'attBody'
System.debug("Rendered XML Content length: " + xmlContent.length);

return null;
