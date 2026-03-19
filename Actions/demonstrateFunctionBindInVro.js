/**
 * @description Demonstrates the JavaScript Function.prototype.bind() method in the vRO context.
 *              Shows the difference between an unbound function call (which loses its context)
 *              and a bound function call (which preserves the original object context).
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

var testObject = {
    x: 42,
    getX: function() {
        return this.x;
    }
};

var unboundGetter = testObject.getX;
System.log("Unbound call result (should be undefined/global context): " + unboundGetter()); 

// Binding the function to the original object context
var boundGetter = unboundGetter.bind(testObject);
System.log("Bound call result (should be 42): " + boundGetter());

return null;
