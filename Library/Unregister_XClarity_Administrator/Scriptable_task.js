/**
 * Simple task with custom script capability.
 *
 * @param {LenovoXClarityIntegrator:XClarityAdministrator} xclarityAdministrator
 */
if(xclarityAdministrator)
{
    var status;
   var status =XClarityRepository.unRegisterLXCA(xclarityAdministrator);
   var name = xclarityAdministrator.name;
   name = name.substring(8);
   name = name.split(":");
   if(status == true)
   {
      System.log("Unregistration of XClarity Administrator \""+name[0]+"\" done successfully.");
   }   else
   {
      System.log("Unregistration of XClarity Administrator \""+name[0]+"\" failed.");
   
   }
}