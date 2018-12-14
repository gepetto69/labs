//problem
var i, j, func, funcArray = [], size = 10;

function generateFunc(itemp) {
    return function () {
        console.log(itemp);
    };
}

for (i = 0; i < size; i += 1) {
  //console.log(i);
    func = generateFunc(i);

  funcArray.push(func);
}

for (j = 0; j < size; j += 1) {
  funcArray[j]();
}

//solution
//var i, j, func, funcArray = [], size = 10;

//function createFunc(index) {
//  return function () {
//    console.log(index);
//  }
//}

//for (i = 0; i < size; i += 1) {
//  func = createFunc(i);
//  funcArray.push(func);
//}

//for (j = 0; j < size; j += 1) {
//  funcArray[j]();
//}