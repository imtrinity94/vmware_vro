if (vraHost == null || url == null) return null; 

var object = 
System.getModule("com.vmware.vra.extensibility.plugin.rest").getObjectFromUrl(vraHost, url, 
parameters); 
var content = object.content; 

var page = 1; 
var allContent = content; 

while (object.last == false) { 
  if (parameters == null || parameters == "") newParameters = "page=" + page; 
  else newParameters = parameters + "&page=" + page; 
  object = 
System.getModule("com.vmware.vra.extensibility.plugin.rest").getObjectFromUrl(vraHost, url, 
newParameters); 
  content = object.content; 
  allContent = allContent.concat(content); 
  page++; 
} 

return allContent;
