/**
 * @description Demonstrates ES5-style prototypal inheritance in vRO.
 *              Creates a base Shape class and a Rectangle subclass that inherits from it.
 *              Shows how to call the parent constructor and share prototype methods.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
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
    this.width  = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
//Rectangle.prototype.constructor = Rectangle;

var R = new Rectangle(1, 2, 3, 4, 5);
System.log(R.x); // 2
R.move(6, 7);
System.log(R.x); // 3 (note: this logs 6 at runtime, comment is from original source)
