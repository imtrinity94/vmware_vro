/* Best way to create an XML inside vRO is to use Properties.
Lets suppose you want to create an XML for NSX
<edge>
    <name>{attXmlConfigName}</name>
    <appliances>
        <applianceSize>compact</applianceSize>
        <appliance>
            <resourcePoolId>{attXmlConfigResourcePoolId}</resourcePoolId>
            <datastoreId>{attXmlConfigDatastoreId}</datastoreId>
        </appliance>
    </appliances>
    <vnics>
        <vnic>
            <index>0</index>
            <name>{attXmlConfigNicName}</name>
            <type>uplink</type>
            <portgroupId>{attXmlConfigPortgroupId}</portgroupId>
            <addressGroups>
                <addressGroup>
                    <primaryAddress>{attXmlConfigPrimaryAddress}</primaryAddress>
                    <subnetMask>{attXmlConfigSubnetMask}</subnetMask>
                </addressGroup>
            </addressGroups>
            <mtu>1500</mtu>
            <isConnected>true</isConnected>
        </vnic>
    </vnics>
    <cliSettings>
        <userName>{attXmlConfigUserName}</userName>
        <password>{attXmlConfigPassword}</password>
        <remoteAccess>false</remoteAccess>
    </cliSettings>
</edge>
*/

var xmlDetail = new Properties();
xmlDetail.put("{attXmlConfigName}",attXmlConfigName);
xmlDetail.put("{attXmlConfigResourcePoolId}",attXmlConfigResourcePoolId);
xmlDetail.put("{attXmlConfigDatastoreId}",attXmlConfigDatastoreId);
xmlDetail.put("{attXmlConfigNicName}",attXmlConfigNicName);
xmlDetail.put("{attXmlConfigPortgroupId}",attXmlConfigPortgroupId);
xmlDetail.put("{attXmlConfigPrimaryAddress}",attXmlConfigPrimaryAddress);
xmlDetail.put("{attXmlConfigSubnetMask}",attXmlConfigSubnetMask);
xmlDetail.put("{attXmlConfigUserName}",attXmlConfigUserName);
xmlDetail.put("{attXmlConfigPassword}",attXmlConfigPassword);
 
//Replace placeholders in XML file with correct values
var attBody = attXmlConfigEsgBody.getContentAsMimeAttachment().content;
for each (var key in xmlDetail.keys) {
    attBody = attBody.replace(key, xmlDetail.get(key));
}
