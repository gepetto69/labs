function any(array, test) {
  var i, max = array.length;

  for (i = 0, max = array.length; i < max; i++) {
    var found = test(array[i]);
    if (found) {
      return found;
    }
  }
  return false;
}

var arr = [3, 55, 89, 324, 22, 5, 85];

any(arr, function (el) { return el % 5 === 0; }); //returns true
any(arr, function (el) { return el > 1000; }); //returns false