//Inputs
//array -> Array/Any
//element -> Any

var result = new RegExp('^('+array.join('|') + ')$').test(element);
return result;
