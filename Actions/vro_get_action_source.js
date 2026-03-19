/**
 * Retrieves the source code of a named vRO action from within the module context.
 * Uses a self-inspection trick: when called as a module action with a String
 * constructor as the argument, it returns the action's script source as a string.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} actionName Name of the action to inspect.
 * @returns {string|undefined} The source code of the action, or undefined if not valid.
 */

var __FN_NAME__ = actionName || 'fnC';

// Self-inspection logic for vRO Modules
if ((typeof this === 'object') && (System.getObjectClassName(this) == 'Module')) {
    var args = [].slice.call(arguments);
    var target = args[0];
    
    // Check if invoked with String constructor as a marker
    var isSelfInspect = (target && typeof target === 'function' && target.name === 'String');
    
    if (isSelfInspect) {
        var actionDescriptions = this.actionDescriptions;
        var matchingAction = actionDescriptions.filter(function(e) { 
            return e.name === __FN_NAME__; 
        })[0];
        
        if (matchingAction && matchingAction.script) {
            return "var __FN_NAME__ = '" + __FN_NAME__ + "'\n" + 
                   matchingAction.script.split('\n').slice(2).join('\n');
        }
    }
}

return undefined;
