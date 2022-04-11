var arrTask;
arrTask = Server.findAllForType('Task');

for (var i = 0; i < arrTask.length; i++) {
    var objTask;
    objTask = arrTask[i];

    System.log("======================================================================");

    System.log("arrTask[" + i + "].error = " + objTask.error);
    System.log("arrTask[" + i + "].executionDate = " + objTask.executionDate);
    System.log("arrTask[" + i + "].execution = " + objTask.execution);
    System.log("arrTask[" + i + "].name = " + objTask.name);
    System.log("arrTask[" + i + "].operation = " + objTask.operation);
    System.log("arrTask[" + i + "].parameters = " + objTask.parameters);
    System.log("arrTask[" + i + "].percentCompleted = " + objTask.percentCompleted);
    System.log("arrTask[" + i + "].state = " + objTask.state);
    System.log("arrTask[" + i + "].workflow = " + objTask.workflow);

    if ((objTask.percentCompleted == 100) && (objTask.state == "completed")) {
        arrTask[i].cancel();

        System.warn("Deleting Completed Scheduled Task...");
    } else if ((objTask.percentCompleted == 100) && (objTask.state == "failed")) {
        System.error("A Completed Scheduled Task has Failed...");
    }

    System.log("======================================================================");
}
