/**
 * Scriptable task
 *
 * @param {number} NIC
 * @param {SRM:RecoveryPlan} Plan
 * @param {VC:VirtualMachine} VM
 * @return {Array/string} NIC_arr
 * @return {string} Ipv4Prot_bind
 * @return {string} Ipv6Prot_bind
 * @return {string} DnsProt_bind
 * @return {string} Ipv4Rec_bind
 * @return {string} Ipv6Rec_bind
 * @return {string} DnsRec_bind
 * @return {string} Ipv4AddressProt_bind
 * @return {string} Ipv4DefaultGatewayProt_bind
 * @return {string} Ipv4AlternateGatewayProt_bind
 * @return {string} Ipv4SubnetMaskProt_bind
 * @return {string} Ipv6AddressProt_bind
 * @return {number} Ipv6SubnetPrefixLengthProt_bind
 * @return {string} Ipv6DefaultGatewayProt_bind
 * @return {string} Ipv6AlternateGatewayProt_bind
 * @return {string} PreferedDnsProt_bind
 * @return {string} AlternateDnsProt_bind
 * @return {Array/string} DnsSufixesProt_bind
 * @return {string} PrimaryWinsProt_bind
 * @return {string} SecondaryWinsProt_bind
 * @return {string} Ipv6AddressRec_bind
 * @return {number} Ipv6SubnetPrefixLengthRec_bind
 * @return {string} Ipv6DefaultGatewayRec_bind
 * @return {string} Ipv6AlternateGatewayRec_bind
 * @return {string} Ipv4AddressRec_bind
 * @return {string} Ipv4SubnetMaskRec_bind
 * @return {string} Ipv4DefaultGatewayRec_bind
 * @return {string} Ipv4AlternateGatewayRec_bind
 * @return {string} PreferedDnsRec_bind
 * @return {string} AlternateDnsRec_bind
 * @return {Array/string} DnsSufixesRec_bind
 * @return {string} PrimaryWinsRec_bind
 * @return {string} SecondaryWinsRec_bind
 * @return {string} NIC_str
 * @return {number} Nic
 */
NIC_arr = ["NIC" + NIC];
var protNicArr = Plan.getRecoverySettings(VM.id).vmIpCustomizationData.protNic;
var protNic;

if (protNicArr != null && protNicArr.length > 0) {
	protNic = protNicArr[NIC - 1];
}

if(protNic != null) {
	if(protNic.ipv4Spec == null) {
		Ipv4Prot_bind = "Use DHCP to obtain an IP address automatically";
	} else {
		Ipv4Prot_bind = "Use the following IPv4 address";
		Ipv4AddressProt_bind = protNic.ipv4Spec.address;
		Ipv4SubnetMaskProt_bind = protNic.ipv4Spec.subnetMask;
		if(protNic.ipv4Spec.gateways) {
			Ipv4DefaultGatewayProt_bind = protNic.ipv4Spec.gateways[0];
			Ipv4AlternateGatewayProt_bind = protNic.ipv4Spec.gateways[1];
		}
	}
	if(protNic.ipv6Spec == null) {
		Ipv6Prot_bind = "Use DHCP to obtain an IP address automatically";
	} else {
		Ipv6Prot_bind = "Use the following IPv6 address";
		Ipv6AddressProt_bind = protNic.ipv6Spec.address;
		Ipv6SubnetPrefixLengthProt_bind = protNic.ipv6Spec.subnetPrefixLength;
		if(protNic.ipv6Spec.gateways) {
			Ipv6DefaultGatewayProt_bind = protNic.ipv6Spec.gateways[0];
			Ipv6AlternateGatewayProt_bind = protNic.ipv6Spec.gateways[1];
		}
	}
	if(protNic.dns == null || protNic.dns.length == 0) {
		DnsProt_bind = "Use DHCP to obtain DNS address automatically";
	} else {
		DnsProt_bind = "Use the following DNS server addresses";
		PreferedDnsProt_bind = protNic.dns[0];
		AlternateDnsProt_bind = protNic.dns[1];
	}
    DnsSufixesProt_bind = protNic.dnsSufix;
	if(protNic.wins) {
		PrimaryWinsProt_bind = protNic.wins[0];
		SecondaryWinsProt_bind = protNic.wins[1];
	}
}

var recNicArr = Plan.getRecoverySettings(VM.id).vmIpCustomizationData.recNic;
var recNic;

if (recNicArr != null && recNicArr.length > 0) {
	recNic = recNicArr[NIC - 1];
}

if(recNic != null) {
	if(recNic.ipv4Spec == null) {
		Ipv4Rec_bind = "Use DHCP to obtain an IP address automatically";
	} else {
		Ipv4Rec_bind = "Use the following IPv4 address";
		Ipv4AddressRec_bind = recNic.ipv4Spec.address;
		Ipv4SubnetMaskRec_bind = recNic.ipv4Spec.subnetMask;
		if(recNic.ipv4Spec.gateways) {
			Ipv4DefaultGatewayRec_bind = recNic.ipv4Spec.gateways[0];
			Ipv4AlternateGatewayRec_bind = recNic.ipv4Spec.gateways[1];
		}
	}
	if(recNic.ipv6Spec == null) {
		Ipv6Rec_bind = "Use DHCP to obtain an IP address automatically";
	} else {
		Ipv6Rec_bind = "Use the following IPv6 address";
		Ipv6AddressRec_bind = recNic.ipv6Spec.address;
		Ipv6SubnetPrefixLengthRec_bind = recNic.ipv6Spec.subnetPrefixLength;
		if(recNic.ipv6Spec.gateways) {
			Ipv6DefaultGatewayRec_bind = recNic.ipv6Spec.gateways[0];
			Ipv6AlternateGatewayRec_bind = recNic.ipv6Spec.gateways[1];
		}
	}
	if(recNic.dns == null || recNic.dns.length == 0) {
		DnsRec_bind = "Use DHCP to obtain DNS address automatically";
	} else {
		DnsRec_bind = "Use the following DNS server addresses";
		PreferedDnsRec_bind = recNic.dns[0];
		AlternateDnsRec_bind = recNic.dns[1];
	}
    DnsSufixesRec_bind = recNic.dnsSufix;
	if(recNic.wins) {
		PrimaryWinsRec_bind = recNic.wins[0];
		SecondaryWinsRec_bind = recNic.wins[1];
	}
}
NIC_str = "Setting IP customization for NIC" + NIC;