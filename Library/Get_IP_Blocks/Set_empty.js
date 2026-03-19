/**
 * Set empty
 *
 * @return {string} outputs
 */
//IPRanges = new Array();
data = {
        "id": "",

        "name": "",

        "ipBlockCIDR": "",

        "description": "",

        "ipVersion": "IPv4",

        "addressSpaceId": "default",

        "dnsServerAddresses": [],

        "dnsSearchDomains": [],

        "domain": "",

        "tags": []}


const x = {ipBlocks: []}
System.log("IP network containers not found in Ipam. Please add network containers.")
//outputs = JSON.stringify(x)//
//const x= {ipBlocks:[{"id":"1","name":'sample',"ipBlockCIDR":"0.0.0.0/32","ipVersion":"ipv4","addressSpaceId":"default"}]}
outputs = JSON.stringify(x)
//throw "Please add containers to Ipam, no containers available."