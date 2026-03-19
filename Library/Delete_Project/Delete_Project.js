/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Project} projectInput
 */
var host = projectInput.host;
if(host == null){
    System.error("Host is missing for project "+ projectInput.name);
    throw new Error("Host is missing for project "+ projectInput.name);
}
else{
    var projectService = host.createInfrastructureClient().createProjectService();
    if(projectInput.zones !=  null && projectInput.zones.length>0){
        throw "Unable to delete project! Please remove the attached zones from Update Workflow first.";
    }
    projectService.deleteProject(projectInput);
    System.log("Project with name '"+ projectInput.name + "' deleted successfully.");
}