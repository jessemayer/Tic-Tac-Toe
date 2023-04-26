// I created a jquery object tiles that represents all the elements with a class of tiles.
// I then created a variable for each player and set them to a string of "X" and "O"
// I created a variable called turn and set it to player_x and current player that i set to "X" so we can start the game with X
// I created a variable gameOver and set it to false so that at the start of a new game it will allow the tileClick function execute
const tiles = $('.tile');
const player_x = "X";
const player_o = "O";
let turn = player_x;
let currentPlayer = "X"
let gameOver = false;

//created an variable that is a array with a length equal to the number of elements in the tiles. 
// then the board.fill(null) line fills the board with null values making the board clear
const board = Array(tiles.length);
board.fill(null);

// created 3 jquery objects that represent the the html element with the #id
let gameOverArea = $('#gameOverArea');
const gameOverText = $('#gameOverText');
const playAgain = $('#playAgain');

// the playAgain.on('click', startNewGame); and playAgain.on('click', resetGame); adds an event listener to the playAgain element to call the startNewGame and playAgain function are both called
// The startNewGame function is responsible for resetting the game board and setting up the game,
//  while the resetGame function is responsible for resetting the game variables and resetting the game state.
playAgain.on('click', startNewGame);
playAgain.on('click', resetGame);

// tiles.each method iterates over all the elements in the tiles, it has two arguments the index of the element and the element its self. 
// it then creates a function that when the jquery tile is clicked execute the tile click function
tiles.each((index, tile) => $(tile).on('click', tileClick));

// this  function is responsible for updating the game state when a tile is clicked. It updates the board, changes the current player, and checks if a winner has been declared.
function tileClick(event) {
  console.log("tileClick function called");
  // checks to see if game is over if it is return and do nothing
  if (gameOver) {
      return;
  }
// The next three lines of code get the DOM element that was clicked (tile), its index (tileNumber), and check if it already has text. 
// If the tile already has text, the function returns and does nothing.
  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if(tile.innerText != ""){
      return;
  }
  // This loop iterates over all the tiles and adds a hover effect to each one. When the mouse enters the tile, the text color becomes green.
  //  When the mouse leaves the tile, the text color returns to the color red.
  tiles.each((index, tile) => {
    $(tile).on('mouseenter', event => {
      $(tile).css('color', 'green');
    });
    $(tile).on('mouseleave', event => {
      $(tile).css('color', 'red');
    });
  });


// conditional for if the turn is player_x
  if (turn === player_x){
    // It sets the innerText property of the tile element to player_o. This will update the text displayed on the tile to O.
      tile.innerText = player_x;
      // It sets the value of the element at index tileNumber - 1 in the board array to player_o. This updates the board array to reflect the current state of the game.
      board[tileNumber - 1] = player_x;
      // It sets the value of the turn variable to player_o. This will switch the turn to the other player.
      turn = player_o;
  } else {
    // It sets the innerText property of the tile element to player_o. This will update the text displayed on the tile to O.
      tile.innerText = player_o;
    // It sets the value of the element at index tileNumber - 1 in the board array to player_o. This updates the board array to reflect the current state of the game.
      board[tileNumber - 1] = player_o;
    // It sets the value of the turn variable to player_x. This will switch the turn back to the first player.
      turn = player_x;
  }
  console.log('board after tileclick', board);
  // executes the checkWinner function
  checkWinner();
}

// this function calls for each function on the jquery object tiles that represents all the tiles on the board. 
// it passes two arguments the index of the current tile element and tile which is the current element 
tiles.each(function(index, tile) {
  // this line creats an event listener for the tile object that takes two arguments the listener "click" and the event which contains information about the event that occurred
  $(tile).on("click", function(event){
  // this line calls the switch turn function after the tile is clicked
    switchTurns();
  });
});


//  created a function to display the player turn 
function displayTurn (){
  // created a variable playerTurn and set it equal to the jquery object id of playerTurn
  let playerTurn = $("#playerTurn");
  // this line updates the text of playerTurn to say in the dom `It is Player ${currentPlayer}'s turn.`
  playerTurn.text(`It is Player ${currentPlayer}'s turn.`)
}

// created a function to switch turns using a conditional 
function switchTurns() {
  // If turn is equal to player_x, set currentPlayer to "X"
  if (turn === player_x) {
    currentPlayer = "X";
  // If turn is not equal to player_x, set currentPlayer to "O".
  } else {
    currentPlayer = "O";
  }
  // called the display turns function
  displayTurn();
}
// calls the switchTurns function
switchTurns()



  // gameOverScreen function displays the winner or a draw.
  // it takes in one argument winnerText
  function gameOverScreen(winnerText) {
    console.log("gameOverScreen function called");
    // created a variable text
    let text;
    // created a conditional that if the winner text is not null set it to text = `The Game Winner is ${winnerText}`
    if (winnerText != null) {
      text = `The Game Winner is ${winnerText}`;
      // else set text to  "It's a Draw!"
    } else {
      text = "It's a Draw!";
    }
    console.log(`gameOverArea element: ${gameOverArea}`);
    console.log(`gameOverText element: ${gameOverText}`);
    console.log(`gameOverText innerText: ${gameOverText.innerText}`);

    // adds the class "visible" to the element with an id of "gameOverArea"
    gameOverArea.get(0).classList.add("visible");
    // sets the text of the element with an id of "gameOverText" to the value of "text"
    gameOverText.text(text);
    // sets the value of the "gameOver" variable to true. 
    // This is used to indicate that the game is over and no further moves should be allowed
    gameOver = true;
  }
  
  
  // tried to create a function that showed an x or o when hovered over
  function bindHoverEvents() {
    tiles.each((index, tile) => {
      $(tile).on('mouseenter', event => {
        if (!tile.innerText) {
          // $(tile).css('background-color', '#b2b2b2');
        }
      });
      $(tile).on('mouseleave', event => {
        if (!tile.innerText) {
          $(tile).css('background-color', 'white');
        }
      });
    });
  }
  
  
  // created a function called startNewGame to start a new game
  function startNewGame() {
    console.log('start new game function called');
    // sets the class name of the element with an id of "gameOverArea" to "hidden". 
    // This hides the element from view by applying the corresponding CSS class
    gameOverArea.className = "hidden";
    // this line fills the entire board array with null values.
    //  This effectively resets the board to its initial state.
    board.fill(null);
    // this line iterates over each tile element and sets its text content to an empty string. 
    // This clears any text that was previously displayed on the tiles.
    tiles.each(function(index, tile) {
      $(tile).text('');
    });
    // this line sets the value of the turn variable back to player_x.
    //  This indicates that player X should go first when the game is restarted.
    turn = player_x;
    // this calls the bindHoverEvents that i couldn't get to work
    bindHoverEvents();
  }
  

  
  // this is the resetGame function
  function resetGame() {
    console.log('reset game function called');
    // this line sets the value of the currentPlayer variable to 'X'.
    //  This is used to track which player's turn it is.
    currentPlayer = 'X';
    // this line line calls the fill method on the board array and sets all of its elements to null.
    //  This is used to reset the board to its initial state
    board.fill(null);
    // this line uses the addClass method to add the class 'hidden' to the gameOverArea element. 
    // This is used to hide the game over screen.
    gameOverArea.addClass('hidden');
    // this line sets the text of the gameOverText element to an empty string.
    //  This is used to clear the text on the game over screen.
    gameOverText.text('');
    // thisline sets the text of the gameOverText element to an empty string. 
    // This is used to clear the text on the game over screen.
    tiles.each((index, tile) => (tile.innerText = ''));
    // calls the bindHoverEvents that i couldn't get to work
    bindHoverEvents();
    // this line line uses the each method to loop through each tile element and adds a click event listener to it. 
    // This allows the user to click on the tiles to make a move.
    tiles.each((index, tile) => $(tile).on('click', tileClick));
    // this line sets the gameOver variable to false which indicates that the game is not over and that moves are allowed.
    gameOver = false
  }

  
// winning combinations for the game
const winningCombinations = [
    //rows
    { combo: [1, 2, 3]},
    { combo: [4, 5, 6]},
    { combo: [7, 8, 9]},
    //columns
   { combo: [1, 4, 7]},
    { combo: [2, 5, 8]},
    { combo: [3, 6, 9]},
    //diagonals
   { combo: [1, 5, 9]},
    { combo: [3, 5, 7]},
  ];
// check winner function
  function checkWinner() {
    console.log('checkWinner function called');
    //this line is using a for-of loop to iterate over the winningCombinations array. 
    // For each element in the array, we are assigning it to the variable winningCombination
    for (const winningCombination of winningCombinations) {
      // this line we are using object destructuring to extract the value of the 'combo' property from the winningCombination object and assigning it to the variable combo
      const { combo } = winningCombination; 
      //The next three lines create variables called tileValue1, tileValue2, and tileValue3, 
      // and assign them the values of the elements at the indexes specified by combo[0], combo[1], and combo[2], respectively
      const tileValue1 = board[combo[0] - 1];
      const tileValue2 = board[combo[1] - 1];
      const tileValue3 = board[combo[2] - 1];
      // this if statment is used to check if tileValue1 is truthy (not null or undefined), and if it is equal to tileValue2 and tileValue3. If all of these conditions are true, then the gameOverScreen function is called with the argument tileValue1. 
      // The return statement at the end of the function will exit the function, preventing any further processing
      if (tileValue1 && tileValue1 === tileValue2 && tileValue2 === tileValue3) {
        gameOverScreen(tileValue1);
        return;
      }
    }
  
    // conditional to see if every element in the board it truthy then it calls the gameOverScreen function. 
    // if there are any null or undifined elements in the board array then the game is not over and the gameOverScreen function is not called
    if (board.every(tile => tile)) {
      gameOverScreen();
    }
  }
  
  