/// <reference path="rockpaperscissors.js" />

(function () {
  var human, computer,
    humanName = prompt('Human, what is your name?');

  human = new RSP.Player(humanName, false);
  computer = new RSP.Player('Computer', true);

  RSP.play(human, computer);
})();