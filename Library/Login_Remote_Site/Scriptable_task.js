/**
 * Scriptable task
 *
 * @param {SRM:Site} Site
 */
if (!Site.getRemoteLsUrl()) {
	throw "Can't get remote lookup service URL.";
}