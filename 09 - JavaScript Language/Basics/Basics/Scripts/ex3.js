function toUppercase(input) {
  var i, max,
    words = input.split(' '),
    result = [],
    uppercaseWord;

  for (i = 0, max = words.length; i < max; i += 1) {
    uppercaseWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    result.push(uppercaseWord);
  }
  return result.join(' ');
}

var test = toUppercase("one does not simply walk into mordor");
console.log(test);