/**
 * Scriptable task
 *
 */
var success = PluginsUtil.dumpAllPluginsConfigurations();
if (!success) {
    throw 'Dump of plugin configurations failed. Check system log for more details.';
}
