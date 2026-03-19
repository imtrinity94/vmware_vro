/**
 * Scriptable task
 *
 * @param {Workflow} wf
 */
function printTags (tags, header)  {
   System.log("-----------------------------------------------------------------------------------------");
   System.log("--  " + header )
   System.log("-----------------------------------------------------------------------------------------");
   for (i in tags) {	
      System.log("   " +i + "=" +tags[i]);
   }
   System.log("");
   System.log("");

}

function printFoundObjects(objects, header)  {
   System.log("-----------------------------------------------------------------------------------------");
   System.log("--  " + header )
   System.log("-----------------------------------------------------------------------------------------");
   for (i in objects) {	
      System.log(" Found : " + objects[i].name);
   }
   System.log("");
   System.log("");
}

  // create private tag
   Server.tag(wf, "my_private_tag", "private tag value");
 
   // create global tag, only admin can do it, fails otherwise
   Server.tagGlobally(wf, "globall_test_tag", "global test tag value");
 
   // find all tags of an object, empty array if no tags exist
   var tags = Server.findTagsForObject(wf)
   printTags(tags, "Private tags for " + wf.name)
 
   var globalTags = Server.findGlobalTagsForObject(wf);
   printTags(globalTags, "Public tags for " + wf.name)

   // Must return all objets tagged with 'tag1' having value 'value1' and 'globaltag' with value 'value2'
   // type is optional, if null no filtering by type is performed
   var tagQry = [{tag:'my_private_tag',value:'private tag value'}];
   var objects = Server.queryByTags(tagQry, 'Workflow');
   printFoundObjects(objects, "Searching for objects tagged with " + JSON.stringify(tagQry));

   // Search by global tags
   var globalTagQry = [{tag:':globall_test_tag'}]
   var objects = Server.queryByTags(globalTagQry, 'Workflow');
   printFoundObjects(objects, "Searching for objects tagged with" + JSON.stringify(globalTagQry));

   // find all used tags (for an optional type)
   System.log("-----------------------------------------------------------------------------------------");
   System.log("---Tags In Use ");
   System.log("-----------------------------------------------------------------------------------------");
   var allTags = Server.findTagsInUse();
   for (i in allTags){
	 System.log(allTags[i]);
   }



   // this method never fails
   var tagsToRemove = ["my_private_tag"];
   System.log("-----------------------------------------------------------------------------------------");
   System.log("--  Remove tag  " + JSON.stringify(tagsToRemove));
   System.log("-----------------------------------------------------------------------------------------");
   Server.untag(wf, tagsToRemove);

   // this can only fail if the user is not admin
   var tagsToRemove = ["globall_test_tag"];
   System.log("-----------------------------------------------------------------------------------------");
   System.log("--  Remove tag  " + JSON.stringify(tagsToRemove));
   System.log("-----------------------------------------------------------------------------------------");
   Server.untagGlobally(wf, ["shared_tag"])

   var tagsAfter = Server.findTagsForObject(wf)
   printTags(tagsAfter, "Tags after untaging")

 


