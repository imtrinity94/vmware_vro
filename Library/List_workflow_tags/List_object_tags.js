/**
 * List object tags
 *
 * @param {Workflow} taggedObject
 * @return {Properties} tags
 * @return {Properties} globalTags
 */
try { 
  var tags = Server.findTagsForObject(taggedObject);
  System.log( "-- Private tags  -------- ");
  for (var i in  tags ){
    System.log( " "+ i + " = " + tags[i]);
  }

  var globalTags = Server.findGlobalTagsForObject(taggedObject);
  System.log( "-- Global tags -------- ");
  for (var i in  globalTags ){
    System.log( " "+ i + " = " + globalTags[i]);
  }
} catch (e) {
  System.error(e);
}
