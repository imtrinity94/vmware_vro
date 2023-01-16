var url = "/iaas/api/tags" 
var parameters = encodeURI("$filter=key eq " + tagKey); 

var tags = System.getModule("com.vmware.vra.extensibility.plugin.rest").getObjects(vraHost, 
url, parameters); 

var tagArray = new Array(); 
for each (var tag in tags) { 
  tagArray.push(tag.key + ":" + tag.value); 
} 
  
return tagArray;
