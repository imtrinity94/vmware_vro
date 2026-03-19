/**
 * @description Demonstrates how to build an XML body for an NSX Edge appliance using Properties
 *              as a placeholder map. Reads a template XML from a Resource Element and replaces
 *              all placeholder tokens with real values.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {ResourceElement} attXmlConfigEsgBody - Resource Element containing the XML template body.
 * @param {string} attXmlConfigName - Value for the {attXmlConfigName} placeholder.
 * @param {string} attXmlConfigResourcePoolId - Value for the {attXmlConfigResourcePoolId} placeholder.
 * @param {string} attXmlConfigDatastoreId - Value for the {attXmlConfigDatastoreId} placeholder.
 * @param {string} attXmlConfigNicName - Value for the {attXmlConfigNicName} placeholder.
 * @param {string} attXmlConfigPortgroupId - Value for the {attXmlConfigPortgroupId} placeholder.
 * @param {string} attXmlConfigPrimaryAddress - Value for the {attXmlConfigPrimaryAddress} placeholder.
 * @param {string} attXmlConfigSubnetMask - Value for the {attXmlConfigSubnetMask} placeholder.
 * @param {string} attXmlConfigUserName - Value for the {attXmlConfigUserName} placeholder.
 * @param {string} attXmlConfigPassword - Value for the {attXmlConfigPassword} placeholder.
 * @returns {void} Sets attBody with the rendered XML string.
 */

/*
 * Best way to create an XML inside vRO is to use Properties.
 * For example, an NSX Edge XML template:
 *
 * <edge>
 *     <name>{attXmlConfigName}</name>
 *     <appliances>
 *         <applianceSize>compact</applianceSize>
 *         <appliance>
 *             <resourcePoolId>{attXmlConfigResourcePoolId}</resourcePoolId>
 *             <datastoreId>{attXmlConfigDatastoreId}</datastoreId>
 *         </appliance>
 *     </appliances>
 *     <vnics>
 *         <vnic>
 *             <index>0</index>
 *             <name>{attXmlConfigNicName}</name>
 *             <type>uplink</type>
 *             <portgroupId>{attXmlConfigPortgroupId}</portgroupId>
 *             <addressGroups>
 *                 <addressGroup>
 *                     <primaryAddress>{attXmlConfigPrimaryAddress}</primaryAddress>
 *                     <subnetMask>{attXmlConfigSubnetMask}</subnetMask>
 *                 </addressGroup>
 *             </addressGroups>
 *             <mtu>1500</mtu>
 *             <isConnected>true</isConnected>
 *         </vnic>
 *     </vnics>
 *     <cliSettings>
 *         <userName>{attXmlConfigUserName}</userName>
 *         <password>{attXmlConfigPassword}</password>
 *         <remoteAccess>false</remoteAccess>
 *     </cliSettings>
 * </edge>
 */

var xmlDetail = new Properties();
xmlDetail.put("{attXmlConfigName}", attXmlConfigName);
xmlDetail.put("{attXmlConfigResourcePoolId}", attXmlConfigResourcePoolId);
xmlDetail.put("{attXmlConfigDatastoreId}", attXmlConfigDatastoreId);
xmlDetail.put("{attXmlConfigNicName}", attXmlConfigNicName);
xmlDetail.put("{attXmlConfigPortgroupId}", attXmlConfigPortgroupId);
xmlDetail.put("{attXmlConfigPrimaryAddress}", attXmlConfigPrimaryAddress);
xmlDetail.put("{attXmlConfigSubnetMask}", attXmlConfigSubnetMask);
xmlDetail.put("{attXmlConfigUserName}", attXmlConfigUserName);
xmlDetail.put("{attXmlConfigPassword}", attXmlConfigPassword);

// Replace placeholders in XML file with correct values
var attBody = attXmlConfigEsgBody.getContentAsMimeAttachment().content;
for each (var key in xmlDetail.keys) {
    attBody = attBody.replace(key, xmlDetail.get(key));
}
