/**
 * @description Un-deploys all vCloud VMs in the provided array if they are currently deployed.
 *              Each deployed VM is shut down via the undeploy operation and internal state
 *              is refreshed afterwards.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclVM[]} arrVclVm - Array of VclVM objects to be un-deployed.
 * @param {*} objCustomActions - A module reference providing the waitVclTask helper method.
 * @returns {void}
 */

// The following script enables an array of VclVM objects to be un-deployed.
for (var i = 0; i < arrVclVm.length; i++) {
    var objVclVm = arrVclVm[i];

    if (objVclVm.deployed == true) {
        var objVclTask = objVclVm.undeploy(VclUndeployPowerActionType.SHUTDOWN);

        objCustomActions.waitVclTask(objVclTask);

        objVclVm.updateInternalState();
    }
}
