/**
 * Set outputs
 *
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint
 * @param {number} attrVacantResults
 * @return {string} outputs
 */
System.log(JSON.stringify(attrIpRanges))
const data = []
var maxlength = 1000;
for (var i = 0; i < Endpoint.Properties.length; i++) {    
  var property = Endpoint.Properties[i];    
  if (property.prop_key == "Infoblox.IPAM.GetIPRanges.maxResults"){        
    maxlength = property.prop_value;    
  }}
  for(var i=0; i < attrIpRanges.length; i++)
  {      
        var dict_data = {        
          'id': attrIpRanges[i].ID,        
          'name': attrIpRanges[i].Name,
          'description': attrIpRanges[i].Description, 
          'ipBlockCIDR': attrIpRanges[i].Name,               
          'ipVersion': attrIpRanges[i].IPVersion,        
          'addressSpaceId': attrIpRanges[i].AddressSpaceId,              
          'tags': attrIpRanges[i].Tags    
          }  

          dict_data['gatewayAddress'] = (Array.isArray(attrIpRanges[i].Gateway) && attrIpRanges[i].Gateway.length)  ? attrIpRanges[i].Gateway[0] : undefined;    
          dict_data['dnsServerAddresses']= (Array.isArray(attrIpRanges[i].dnsServerAddresses) && attrIpRanges[i].dnsServerAddresses.length) ? attrIpRanges[i].dnsServerAddresses : undefined;    
          dict_data['dnsSearchDomains']= (Array.isArray(attrIpRanges[i].DNSSearchSuffixes) && attrIpRanges[i].DNSSearchSuffixes.length) ? attrIpRanges[i].DNSSearchSuffixes : undefined;    
          dict_data['domain']= (typeof attrIpRanges[i].DNSSuffix === 'string') ? attrIpRanges[i].DNSSuffix : undefined;    
          
          data.push(dict_data)
          if (i === maxlength -1 || i === attrIpRanges.length - 1 ) {        
                break;        
            }
          }
          
          const x = {ipBlocks: data}

System.log(JSON.stringify(x))
outputs = JSON.stringify(x)