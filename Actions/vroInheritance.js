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

// --- Base Class Definition ---
var BaseShape = function(id, coordX, coordY) {
    this.id = id;
    this.x = coordX;
    this.y = coordY;
};

BaseShape.prototype.move = function(newX, newY) {
    this.x = newX;
    this.y = newY;
};

// --- Subclass Definition ---
var RectangleSubclass = function(id, coordX, coordY, widthPx, heightPx) {
    // Invoke parent constructor with current context
    BaseShape.call(this, id, coordX, coordY);
    this.width = widthPx;
    this.height = heightPx;
};

// --- Inheritance Setup ---
// Link Rectangle prototype to Shape prototype
RectangleSubclass.prototype = Object.create(BaseShape.prototype);
RectangleSubclass.prototype.constructor = RectangleSubclass;

// --- Demonstration Logic ---

System.log("Constructing inherited Rectangle object...");
var myRect = new RectangleSubclass(101, 10, 20, 100, 50);
System.log("Rectangle Initial Position: (" + myRect.x + "," + myRect.y + ") [Size: " + myRect.width + "x" + myRect.height + "]");

System.log("Executing move() method inherited from BaseShape...");
myRect.move(60, 70);
System.log("Rectangle Final Position: (" + myRect.x + "," + myRect.y + ")");

return null;
