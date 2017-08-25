var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  //empty array for in-order cards

  var cardGrid = [];
  for (var i = 1; i <= 8; i++) {
    cardGrid.push(i, i);
  }
  var randomCards = cardGrid.length, t, j;
  while (randomCards) {
    j = Math.floor(Math.random() * randomCards--);
    t = cardGrid[randomCards];
    cardGrid[randomCards] = cardGrid[j];
    cardGrid[j] = t;
  }
  return cardGrid;
};



/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedCards', []);
  $game.data('gameFlippedCards', []);

  var cardColors = [
    'hsl(25,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'
  ];

  $('#game').html('');
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', cardColors[cardValues[i] - 1]);
    $game.append($card);

    $card.click(function() {
      MatchGame.flipCard($(this), $game);
    });
  }

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  var $flippedCards = $game.data('flippedCards');
  var $gameFlippedCards = $game.data('gameFlippedCards');

  if ($card.data('flipped') === true) {
    return;
  }
  else {
    $card.css('background-color', $card.data('color'));
    $card.append($card.data('value'));
    $card.data('flipped', true);
    $flippedCards.push($card);
  }
  if ($flippedCards.length == 2) {
    if ($flippedCards[0].data('color') === $flippedCards[1].data('color')) {
      $flippedCards[0].css('background-color', 'rgb(153,153,153)').css('rgb(204,204,204)');
      $flippedCards[1].css('background-color', 'rgb(153,153,153)').css('rgb(204,204,204)');
      $flippedCards.length = 0;
      $gameFlippedCards.push($card[0], $card[1]);
    } else {
      $('.card').off('click');
			setTimeout(function() {
				$flippedCards[0].html('').css('background-color', 'rgb(32,64,86)').data('flipped', false);
				$flippedCards[1].html('').css('background-color', 'rgb(32,64,86)').data('flipped', false);
				$flippedCards.length = 0;
				$('.card').click(function() {
					MatchGame.flipCard($(this), $game);
				});
      }, 450);
    }

  } else return;

};
