/**
 * Demonstrates ES5-style prototypal inheritance in vRO.
 * Creates a base Shape class and a Rectangle subclass that inherits from it.
 * Shows how to call the parent constructor and share prototype methods.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

var Shape = function(id, x, y) {
    this.id = id;
    this.move(x, y);
};

Shape.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};

var Rectangle = function(id, x, y, width, height) {
    Shape.call(this, id, x, y);
    this.width = width;
    this.height = height;
};

// Inherit from Shape
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

// Instantiate and Test
var R = new Rectangle(1, 2, 3, 4, 5);
System.log("Rectangle initial (x,y): " + R.x + ", " + R.y);

R.move(6, 7);
System.log("Rectangle after move (x,y): " + R.x + ", " + R.y);
