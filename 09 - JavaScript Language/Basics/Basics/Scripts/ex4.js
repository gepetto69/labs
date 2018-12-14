var options = ['paper', 'scissors', 'rock'];

function Player(name, isComputer) {
  this.name = name;
  this.isComputer = isComputer;
  this.score = 0;
  this.weapon = '';
}

Player.prototype.draw = function () {
  var index;

  if (this.isComputer) {
    index = Math.floor(Math.random() * 3);
    this.weapon = options[index];
  } else {
    this.weapon = prompt(this.name + ', choose your weapon', this.weapon || 'paper');
  }
};

Player.prototype.toString = function () {
  return this.name + ' has a score of ' + this.score;
};

function compare(first, second) {
  switch (first) {
    case 'paper':
      if (second === 'paper') { return 0; }
      if (second === 'rock') { return 1; }
      if (second === 'scissors') { return -1; }
      break;
    case 'scissors':
      if (second === 'scissors') { return 0; }
      if (second === 'paper') { return 1; }
      if (second === 'rock') { return -1; }
      break;
    case 'rock':
      if (second === 'rock') { return 0; }
      if (second === 'scissors') { return 1; }
      if (second === 'paper') { return -1; }
      break;
    default:
      throw new Error('first weapon is invalid');
  }
  //if northing is returned yet, the second weapon is invalid
  throw new Error('second weapon is invalid');
}

//alternative version
//function compare(first, second) {
//  var index1, index2, result;

//  index1 = options.indexOf(first);
//  index2 = options.indexOf(second);

//  if (index1 < 0) {
//    throw new Error('first weapon is invalid');
//  } else if (index2 < 0) {
//    throw new Error('second weapon is invalid');
//  } else {

//    result = index1 - index2;
//    if (result === 2) {
//      return -1;
//    } else if (result === -2) {
//      return 1;
//    } else {
//      return result;
//    }

//  }
//}

function play(player1, player2) {
  var result, i, max = 3;

  for (i = 0; i < max; i += 1) {
    player1.draw();
    player2.draw();

    try {
      result = compare(player1.weapon, player2.weapon);
      player1.score += result;
      player2.score -= result;
      console.log(player1.toString());
      console.log(player2.toString());
    } catch (e) {
      console.log(e.message);
    }
  }
}

function init() {
  var human, computer,
    humanName = prompt('Human, what is your name?');

  human = new Player(humanName, false);
  computer = new Player('Computer', true);

  human.draw();
  computer.draw();

  console.log(human.weapon);

  play(human, computer);
}

init();