/**
 * @description Retrieves the source code of a named vRO action from within the module context.
 *              Uses a self-inspection trick: when called as a module action with a String
 *              constructor as the argument, it returns the action's script source as a string.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {string|undefined} The source code of the action named by __FN_NAME__, or undefined
 *                             if not invoked in the module self-inspection context.
 */

var __FN_NAME__ = 'fnC';
if ((typeof this === 'object') && (System.getObjectClassName(this) == 'Module') && ($_a = [].slice.call(arguments)[0], ($_a && typeof $_a === 'function' && $_a.name === 'String') ? true : false)) return ("var __FN_NAME__ = '" + __FN_NAME__ + "'\n" + this.actionDescriptions.filter(function(e) { return e.name === __FN_NAME__; })[0].script.split('\n').slice(2).join('\n'));
