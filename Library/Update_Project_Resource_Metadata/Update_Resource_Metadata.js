/**
 * Simple task with custom script capability.
 *
 * @param {Array/string} newTags
 * @param {VRA:Project} projectInput
 * @return {VRA:Project} outputProject
 */
var newTagPropertiesArray = System.getModule("com.vmware.library.vra.infrastructure.util").convertToTagPropertiesArray(newTags);
if(newTagPropertiesArray.length>0){
    //Converting newTagPropertiesArray to tag object
    var tagsArray = new Array();
    for each(var tagProp in newTagPropertiesArray) {
        addTagObject(tagsArray, tagProp.key, tagProp.value);
    }
    //Get old tags and append.
    var response = VraEntitiesFinder.getProjectResourceMetadata(projectInput.host, projectInput.id);
    if (response && response.tags) {
        var oldTags = response.tags;
        for (var tagIndex in oldTags) {
            addTagObject(tagsArray, oldTags[tagIndex].key, oldTags[tagIndex].value);
        }
    }

    var projectService = projectInput.host.createInfrastructureClient().createProjectService();
    var projectResourceMetadataSpecification = new VraProjectResourceMetadataSpecification();
    projectResourceMetadataSpecification.tags = tagsArray;

    outputProject = projectService.updateProjectResourceMetadata(projectInput.id, projectResourceMetadataSpecification);
}

//Setting outputProject Response
outputProject = projectInput;

function addTagObject(tagsArray, key, value) {
    var tag = new VraTag();
    tag.key = key;
    tag.value = value;
    tagsArray.push(tag);
    return tagsArray;
}