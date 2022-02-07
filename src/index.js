import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import Triangle from './js/demo.js';

class Game {
  constructor(){
    this.board = new GameBoard();
    this.player = new Character();
  }

  move( direction ){
    let row = this.player.currentspace[0] ;
    let col = this.player.currentspace[1];
    let boardCols = this.board.grid[0].length;
    let boardRows = this.board.grid.length;

    if (direction === "left"){
      if (col - 1 >= 0){
        this.player.currentSpace[row][col--];
      }
    }
    else if (direction === "right"){
      if (col + 1 < boardCols ){
        this.player.currentSpace[row][col++];
      }
    }
    else if (direction === "up"){
      if (row -1 >= 0){
        this.player.currentSpace[row--][col];
      }
    }
    else if (direction === "down"){
      if (row + 1 < boardRows){
        this.player.currentSpace[row++][col];
      }
    }
    else  {
      alert("that move makes no sense!");
    }
  }
}

class GameBoard  {
  constructor(){
    this.grid = [ ["", "", "", ""], 
                  ["", "", "", ""],
                  ["", "", "", ""],
                  ["", "", "", ""]  ];
  }
}

class Character  {
  constructor(){
    this.currentSpace = [0, 0];
  }

}


//UI stuffz


function moveChar( imageId, posShift ){

      //ALGO1 change images position by moving left and top values ---FAIL (needs to just add +/- 100px in whatever direction, or read column width/height from the css instead of just hardcoding 100px, so if you change column width/height it'll still work. This code mixes up the two algorithms, so doesn't work!
  // const oldPositionIndeces = $(imageId).parent(".col-").attr("id").split("-");
  //  const rowNum =  parseInt(oldPositionIndeces[0]) + parseInt(posShift[0]);
  //  const colNum =  parseInt(oldPositionIndeces[1]) + parseInt(posShift[1]);
  // const newPosition = $("#" + rowNum + "-" + colNum).position();

  // $(imageId).parent(".col-").html();
  // $("#row" + rowNum + " #col" + colNum).html('<img src="assets/images/hero.png" id="heroImg" class="imgCharactersDynamic">');
  // $(imageId).css({"left": newPosition.left, "top": newPosition.top});


      //ALGO2 change images position by moving image to new column (won't work with animation)
  const oldPositionIndeces = $(imageId).parent(".col-").attr("id").split("-");
  const oldRowNum = parseInt(oldPositionIndeces[0]);
  const oldColNum = parseInt(oldPositionIndeces[1]);
  const newRowNum = oldRowNum + parseInt(posShift[0]);
  const newColNum = oldColNum + parseInt(posShift[1]);
  $( "#" + oldRowNum + "-" + oldColNum).html("");
  $( "#" + newRowNum + "-" + newColNum).html('<img src="assets/images/hero.png" id="heroImg" class="imgCharactersDynamic">');
}

// function charController(imageId){
  
// }



let game = new Game();
const heroImgId = "#heroImg";
//const playerImg = ""

  //creates a new board
game.board.grid.forEach( (row, index) =>{
  $("#map").append("<div id='row" + index + "' class='row'></div>");
  row.forEach( (col, innerdex) =>{
    $("#row" + index.toString()).append("<div id='" + index + "-" + innerdex + "' class='col-'></div>");
  });
});

  //displays character in left top space on board
let hack = 0;
if (hack < 1 ){
  $(".col-#0-0").append('<img src="assets/images/hero.png" id="heroImg">');
  hack++;
}
  
 moveChar(heroImgId, [0,0]);

 $(document).keydown(function(e){

  const coords = $(heroImgId).parent(".col-").attr("id").split("-");
  const row = parseInt(coords[0]);
  const col = parseInt(coords[1]);
 

  const boardCols = game.board.grid[0].length;;
  const boardRows = game.board.grid.length;

  switch (e.which){
  case 37:    //left arrow key
    if (col - 1 >= 0){
      moveChar(heroImgId, [0,-1]);
    }
    break;
  case 38:    //up arrow key
    if (row -1 >= 0){
      moveChar(heroImgId, [-1,0]);
    }
    break;
  case 39:    //right arrow key
    if (col + 1 < boardCols ){
      moveChar(heroImgId, [0,1]);
    }
    break;
  case 40:    //bottom arrow key
    if (row + 1 < boardRows){
      moveChar(heroImgId, [1,0]);
    }
    break;
  }
});
 //charController(heroImgId);




