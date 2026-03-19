/**
 * setIpCustomization
 *
 * @param {SRM:RecoveryPlan} plan
 * @param {Array/CompositeType(IsWindowsOs:boolean,Nic:number,Ipv4Prot:string,Ipv4AddressProt:string,Ipv4SubnetMaskProt:string,Ipv4DefaultGatewayProt:string,Ipv4AlternateGatewayProt:string,Ipv6Prot:string,Ipv6AddressProt:string,Ipv6SubnetPrefixLengthProt:number,Ipv6DefaultGatewayProt:string,Ipv6AlternateGatewayProt:string,DnsProt:string,PreferedDnsProt:string,AlternateDnsProt:string,DnsSufixesProt:Array/string,PrimaryWinsProt:string,SecondaryWinsProt:string,Ipv4Rec:string,Ipv4AddressRec:string,Ipv4SubnetMaskRec:string,Ipv4DefaultGatewayRec:string,Ipv4AlternateGatewayRec:string,Ipv6Rec:string,Ipv6AddressRec:string,Ipv6SubnetPrefixLengthRec:number,Ipv6DefaultGatewayRec:string,Ipv6AlternateGatewayRec:string,DnsRec:string,PreferedDnsRec:string,AlternateDnsRec:string,DnsSufixesRec:Array/string,PrimaryWinsRec:string,SecondaryWinsRec:string)} ipSettings
 * @param {VC:VirtualMachine} vm
 * @param {string} ipCustomizationMode
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.srm.protect.config").setIpCustomization(plan,vm,ipSettings,ipCustomizationMode) ;