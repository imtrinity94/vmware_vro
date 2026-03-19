/**
 * @description Demonstrates the JavaScript Function.prototype.bind() method in the vRO context.
 *              Shows the difference between an unbound function call (which loses its context)
 *              and a bound function call (which preserves the original object context).
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

const module = {
    x: 42,
    getX: function() {
        return this.x;
    }
};

const unboundGetX = module.getX;
System.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(module);
System.log(boundGetX());
// expected output: 42
