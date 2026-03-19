/**
 * Incoming replications
 *
 * @param {VR:VcRemoteSite} remoteSite
 * @param {VR:Site} site
 * @return {Array/Any} replications
 */
if(remoteSite != null && remoteSite != "") {
    replications = remoteSite.getReplicationsTo();
} else {
    replications = [];
    var remoteSites = site.getVcRemoteSites();
    for (var i = 0; i < remoteSites.length; i++) {
    var repl = remoteSites[i].getReplicationsTo();
    if(repl != null && repl.length > 0)
        replications.push(repl);
    }
}