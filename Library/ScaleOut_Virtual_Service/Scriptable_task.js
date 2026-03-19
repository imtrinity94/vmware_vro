/**
 * Scriptable task
 *
 * @param {Avi:VirtualService} virtualServiceObject
 */
var url=virtualServiceObject.getUrl();
var controller=url.substring(url.indexOf("//")+2, url.indexOf("/api"));
var aviVroClient=null;
vroClientArray=Server.findAllForType('Avi:AviVroClient','');
for each(vroClient in vroClientArray){
		if(vroClient !=null){
		vroController=vroClient.cred.controller;
		if(vroController==controller){
		aviVroClient=vroClient;
		}
	}	
}
try{
	if(aviVroClient!=null)
	{		
			var vsUUId= virtualServiceObject.getUuid();
			var path ="virtualservice/"+vsUUId+"/scaleout";
				var properties = new Object();
				properties.to_new_se=false;
				properties.vip_id="1";
				var jsonData = JSON.stringify(properties);
				aviVroClient.callAction(path,"POST",jsonData);
				System.log("Vs scaleout successfully.");
		}
	}catch(e){
		System.log("Error occured while scaleout VS : "+e)
	}