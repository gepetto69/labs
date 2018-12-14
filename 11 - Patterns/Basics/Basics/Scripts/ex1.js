var num = Math.ceil(Math.random() * 10);

var gnumstring = prompt('Guess the number between 1 and 10 inclusive');

var gnum = parseInt(gnumstring);

if (gnum === num)
  alert('Good job!');
else
  alert('Not matched, the number was ' + num);