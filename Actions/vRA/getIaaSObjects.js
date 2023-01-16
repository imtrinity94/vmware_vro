if (vraHost == null || url == null) return null; 

var iaasObject = 
System.getModule("com.vmware.vra.extensibility.plugin.rest").getObjectFromUrl(vraHost,url, 
parameters); 
var content = iaasObject.content; 

var skip = 0; 
var elementsLeft = iaasObject.totalElements - iaasObject.numberOfElements; 
var allContent = content; 
var numberOfElements = iaasObject.numberOfElements 

while (elementsLeft >0) { 
  var skip = skip + numberOfElements; 
  if (parameters == null) parameters = "$skip=" + skip; 
  else parameters = parameters + "&$skip=" + skip; 
  iaasObject = 
System.getModule("com.vmware.vra.extensibility.plugin.rest").getObjectFromUrl(vraHost,url, 
parameters); 
  content = iaasObject.content; 
  elementsLeft = elementsLeft - iaasObject.numberOfElements; 
  allContent = allContent.concat(content); 
}

 return allContent;
