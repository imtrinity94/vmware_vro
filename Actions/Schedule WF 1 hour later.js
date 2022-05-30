var workflowToLaunch = myWorkflow ;  
// create parameters 
var workflowParameters = new Properties() ;
workflowParameters.put("name","John Doe") ;
// change the task name 
workflowParameters.put("__taskName","Workflow for John Doe") ; 

// create scheduling date one hour in the future
var workflowScheduleDate = new Date() ; 
var time = workflowScheduleDate.getTime() + (60*60*1000) ;
workflowScheduleDate.setTime(time) ; var scheduledTask =
workflowToLaunch.schedule(workflowParameters,workflowScheduleDate);
