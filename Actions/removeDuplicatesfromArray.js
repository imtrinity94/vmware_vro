// VMware vRealize Orchestrator action sample
//
// Removes duplicates from an array, with the option to also sort the array
// 
// For vRO 6.0+
//
// Action Inputs:
// a - Array/Any - Array with potential duplicates
// doSort - boolean - Sort the array also? Potentially better performance than unsorted algorithm
//
// Return type: Array/Any

var b = (doSort) ? removeDupesSorted(a) : removeDupesUnsorted(a);
return b;

///////////////////
function removeDupesSorted(a) {
  var b = new Array();

  if (!a) return null;

  if (a.length != 0) {
    a.sort();
    b.push(a[0]);

    for (var i = 0; i < a.length - 1; i++) {
      if (a[i+1] != a[i]) b.push(a[i+1]);
    }
  }

  return b;
}
 
function removeDupesUnsorted(a) {
  var b = new Array();

  if (!a) return null;

  if (a.length != 0) {
    for each (var x in a) {
      if (!isPresent(x, b)) {
        b.push(x);
      }
    }
  }

  return b;
}
 
// is value x present in array ?
function isPresent(x, a) {
  if (a) {
    for each (var y in a) {
      if (x === y) {
        return true;
      }
    }
  }

  return false;
}
