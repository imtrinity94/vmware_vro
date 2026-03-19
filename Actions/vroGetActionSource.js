/**
 * Retrieves the source code of a named vRO action from within the module context.
 * Uses a self-inspection trick: when called as a module action with a String
 * constructor as the argument, it returns the action's script source as a string.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} targetActionName - Name of the action to inspect.
 * @returns {string|undefined} The source code of the action, or undefined if not valid.
 */

var resolvedActionName = targetActionName || 'fnC';

// Validate context: This logic is intended for execution within a vRO Module object
if (typeof this === 'object' && System.getObjectClassName(this) === 'Module') {
    var rawArgumentsList = [].slice.call(arguments);
    var selfInspectionMarker = rawArgumentsList[0];
    
    // Identity verification: Check if invoked with String constructor as the unique marker
    var isReflectionMode = (selfInspectionMarker && typeof selfInspectionMarker === 'function' && selfInspectionMarker.name === 'String');
    
    if (isReflectionMode) {
        var actionMetadataArray = this.actionDescriptions;
        
        // Search for the specific action definition within the current module
        var matchedActionMetadata = actionMetadataArray.filter(function (actionItem) { 
            return actionItem.name === resolvedActionName; 
        })[0];
        
        if (matchedActionMetadata && matchedActionMetadata.script) {
            // Reconstruct the script by stripping vRO-internal header lines (assuming top 2 lines are metadata)
            var scriptBodyLines = matchedActionMetadata.script.split('\n').slice(2);
            
            return "var resolvedActionName = '" + resolvedActionName + "';\n" + 
                   scriptBodyLines.join('\n');
        } else {
            System.debug("Reflection failed: Action '" + resolvedActionName + "' was not found or has no script content.");
        }
    }
} else {
    System.debug("Reflection aborted: Code is not executing within a Module context.");
}

return undefined;
