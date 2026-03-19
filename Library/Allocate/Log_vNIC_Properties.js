/**
 * Simple task with custom script capability.
 *
 * @param {number} attrVnicIndex
 * @param {string} attrDnsView
 * @param {string} attrComment
 * @param {Array/string} attrAliases
 * @param {string} attrMsDhcpServer
 * @param {boolean} attrEnableDhcp
 * @param {boolean} attrEnableDns
 * @param {boolean} attrReconfigure
 * @param {string} attrDNSSuffixOverride
 * @param {string} attrNetworkView
 */
var text = "Got vNIC #" + attrVnicIndex + " properties:";
text += "\n\tdnsView: " + attrDnsView;
text += "\n\tcomment: " + attrComment;
text += "\n\taliases: " + attrAliases;
text += "\n\tmsDhcpServer: " + attrMsDhcpServer;
text += "\n\tenableDhcp: " + attrEnableDhcp;
text += "\n\tenableDns: " + attrEnableDns;
text += "\n\tdnsSuffixOverride: " + attrDNSSuffixOverride;
text += "\n\tnetworkView: " + attrNetworkView
System.log(text);