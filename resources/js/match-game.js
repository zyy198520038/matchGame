var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
// More jQuery code goes in here later
MatchGame.renderCards(MatchGame.generateCardValues(),$('#game'))
});


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var orderedArray=[];
  var randomArray=[];
  var randomNum=0;
  for(var i=0;i<8;i++){
    orderedArray.push(i+1);
    orderedArray.push(i+1);
  }
  while (orderedArray.length!=0) {
    var orderedArrayLength=orderedArray.length;//(1-16)
    randomNum=Math.floor(Math.random()*(orderedArrayLength));//(0-15)
    randomArray.push(orderedArray[randomNum]);
    orderedArray.splice(randomNum,1);
}
return randomArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var cardColor=[
  'hsl(25,85%,65%)',
  'hsl(55,85%,65%)',
  'hsl(90,85%,65%)',
  'hsl(160,85%,65%)',
  'hsl(220,85%,65%)',
  'hsl(265,85%,65%)',
  'hsl(310,85%,65%)',
  'hsl(360,85%,65%)'];

  $game.empty();
  $game.data('flippedCards',[]);
  for(var i=0;i<cardValues.length;i++){
      var value=cardValues[i];
      var color=cardColor[value-1];
      var indexNum=i;
      var data={
        value:value,
        color:color,
        fliped:false,
        disable:false,
        indexNum:indexNum
      }
      var $gameCard = $('<div class="col-xs-3 card"></div>');
      $gameCard.data(data);
      //console.log($gameCard.data("value"));
      $game.append($gameCard);
    }
    $('.card').click(function() {
      if($(this).data("disable")==false){
    MatchGame.flipCard($(this), $('#game'));
  }
  });
  }

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
var flippedCards=  $game.data('flippedCards');
  $card.data("fliped", true);
  if($card.data("fliped")===true){
    $card.text($card.data("value"));
    $card.css('background-color', $card.data("color"));
    flippedCards.push($card);
    //console.log("normal"+flippedCards[0].css('background-color'));
    if(flippedCards.length===2){
      console.log("index0= "+flippedCards[0].data('indexNum'));
      console.log("index1= "+flippedCards[1].data('indexNum'));
      console.log("value0= "+flippedCards[0].data('value'));
      console.log("value1= "+flippedCards[1].data('value'));
    if(flippedCards[0].data('value')==flippedCards[1].data('value')&&flippedCards[0].data('indexNum')!=flippedCards[1].data('indexNum')){
      console.log("i am here")
      flippedCards[0].css('background-color', 'rgb(153,153,153)');
      flippedCards[1].css('background-color', 'rgb(153,153,153)');
      flippedCards[0].css('color', 'rgb(204,204,204)');
      flippedCards[1].css('color', 'rgb(204,204,204)');
      flippedCards[1].css('color', 'rgb(204,204,204)');
      flippedCards[0].data('disable', true);
      flippedCards[1].data('disable', true);


    }else {

      //$card.text("");
      window.setTimeout(function() {
      flippedCards[0].text("");
      flippedCards[1].text("");
      flippedCards[0].css('background-color', 'rgb(32, 64, 86)');
      flippedCards[1].css('background-color', 'rgb(32, 64, 86)');
      flippedCards[0].data('fliped', false);
      flippedCards[1].data('fliped', false);
    },400);
    }
    $game.data('flippedCards',[]);
  }





  }


};
