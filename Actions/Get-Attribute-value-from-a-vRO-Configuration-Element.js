/* Copyright 2020, VMware, Inc. All Rights 
   VMware vRealize Orchestrator 7.x action sample

   Returns a Configuration Element Attribute Value. 

    Inputs: 
            categoryPath Type: String This is the Cofiguration Element Path
            cfgName Type:String This is the element name    
            attributeName Type: String This is the name of the Attribute
    Output:
            Array/Properties
*/

var category = Server.getConfigurationElementCategoryWithPath(categoryPath);

if (category == null)
{
  throw("Configuration element path '" + categoryPath + "' not found!!");
}

var cfgElements = category.configurationElements.filter(function(element) {  
	return element.name == cfgName;  
});

//Get attribute names
if(cfgElements != null && cfgElements.length == 1){
for (attribute in cfgElements[0].attributes)
{
	if(cfgElements[0].attributes[attribute].name == attributeName){
		return cfgElements[0].attributes[attribute].value;
	}
}
}else{
	throw("Configuration name '" + cfgName + "' not found or not unique!!");
}
return null;
