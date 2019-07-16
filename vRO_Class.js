//URL: http://es6-features.org/#ClassDefinition
//ECMAScript 6
/*
class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}
*/
//ECMAScript 5 equivalent (vRO Class creation)
var Shape = function (id, x, y) {
    this.id = id;
    this.move(x, y);
};
Shape.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};

var S = new Shape(1,2,3);
System.log(S.x + S.y); //5
S.move(4,5);
System.log(S.x + S.y); //9
