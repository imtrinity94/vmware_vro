/**
 * Demonstrates ES5-style class definition in vRO (equivalent to ES6 class syntax).
 * Creates a Shape constructor function and attaches a move method via prototype.
 * Shows how to instantiate and use the class in a vRO context.
 * 
 * Note: Reference: http://es6-features.org/#ClassDefinition
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// ECMAScript 5 equivalent (vRO Class creation)
var Shape = function(id, x, y) {
    this.id = id;
    this.move(x, y);
};

Shape.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};

// Instantiate and Test
var S = new Shape(1, 2, 3);
System.log("Initial state (x,y): " + S.x + ", " + S.y); 

S.move(4, 5);
System.log("After move (x,y): " + S.x + ", " + S.y);
