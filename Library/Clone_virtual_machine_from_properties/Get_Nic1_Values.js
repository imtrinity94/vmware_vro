/**
 * Get Nic1 Values
 *
 * @param {Properties} props
 * @return {VC:Network} nic1Network
 * @return {Array/string} nic1DnsServerList
 * @return {string} nic1DnsDomain
 * @return {boolean} nic1Dhcp
 * @return {Array/string} nic1Gateway
 * @return {string} nic1IpAddress
 * @return {string} nic1MacAddress
 * @return {VC:CustomizationNetBIOSMode} nic1NetBIOS
 * @return {string} nic1PrimaryWINS
 * @return {string} nic1SecondaryWINS
 * @return {string} nic1SubnetMask
 */
nic1Network = props.get("nic1Network");
nic1DnsServerList = props.get("nic1DnsServerList");
nic1DnsDomain = props.get("nic1DnsDomain");
nic1Dhcp = props.get("nic1Dhcp");
nic1Gateway = props.get("nic1Gateways");
nic1IpAddress = props.get("nic1IpAddress");
nic1MacAddress = props.get("nic1MacAddress");
nic1NetBIOS = props.get("nic1NetBIOS");
nic1PrimaryWINS = props.get("nic1PrimaryWINS");
nic1SecondaryWINS = props.get("nic1SecondaryWINS");
nic1SubnetMask = props.get("nic1SubnetMask");