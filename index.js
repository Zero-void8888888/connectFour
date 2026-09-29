/*

Author: Jose Mondragon


Date: 9/28/26


Description: connect four game



*/

//main function is at the bottom
import promptSync from 'prompt-sync';
import {writeFile,readFile} from 'node:fs/promises' ;

let row = 6;
let  column = 7;
let  board = [];

 //populate the board array with empty strings.

for(let i = 0; i < row; i++ ){
        board[i] = []
    for( let j  = 0; j < column ; j++){
        board[i].push(0);
    }
}

//print board
const PRINTBOARD= () => {
    let dataString = '';
    for(let i = 0 ; i < row; i++){
        for(let j = 0; j < column ; j++){
            dataString += board[i][j] + " ";
        }
        console.log(dataString)
        dataString = '';
    }

}

const RESETBOARD= () => {
    for(let i = 0; i < row; i++ ){
            board[i] = []
        for( let j  = 0; j < column ; j++){
                board[i].push(0);
        }
}
}

//mark square or spot

const MARKCOLUMN = (column,player) =>{
    //filter is used as a length to measure the avaible squares for a column, then we map it with the values at said position to get
    //the column as an array

    let rowsWithCells = board.filter( (row) => row[column] === 0).map( row => row[column]);

    // if lenght is zero then return
    if(!rowsWithCells.length) {
        return rowsWithCells.length
    }

    board[rowsWithCells.length-1][column] = player.value;
    return rowsWithCells.length-1
}






//establishing players

let players = [{
        playersGeneralName:"one",
        name:null,
        value: 1
    },{
        playersGeneralName:"two",
        name:null,
        value: 2
    }]



let activePlayer = players[0];

const GETACTIVEPLAYER = () => {
    return activePlayer
}


const SWITCHACTIVEPLAYER = () =>{
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
}

// input
console.log("Hello, Welcome To Connect Four\n");
const PROMPT = promptSync();
let input = PROMPT("What is your name Player One:");
console.log(`hello : ${input}\n`);

players[0].name = input;


let input2 = PROMPT("What is your name Player Two: ");
console.log(`hello : ${input2}\n`);

players[1].name = input2;

//print new round
const PLAYNEWROUND = () =>{
    console.log(`Player's ${GETACTIVEPLAYER().playersGeneralName}, ${GETACTIVEPLAYER().name}, turn: make a move:` )
    PRINTBOARD();
    let falseInput = true;
    let gameOver = false;
    let input3;
    do{
        input3 = Number(PROMPT("choose a column to drop the token: "));
        if(input3 < 1 || input3 > 7 || Number.isNaN(input3)){
            console.log("try again");
            continue
}
        falseInput = false;
        let row =  MARKCOLUMN(input3-1, GETACTIVEPLAYER())

    }while( falseInput == true)

    // WINNING will return a bolean that determines whether a win conditioned occured or draw hench the game ending
    gameOver  = WINNING(row,input3-1,GETACTIVEPLAYER(),gameOver);
    if(gameOver == true){
        return true
    }
    SWITCHACTIVEPLAYER()

}


const WINNING = (row,column, player) => {
   // filter at rows and check each direction of winning
    let counterForPlayerOne = 0;
    let counterForPlayerTwo = 0;
    let amountOFCells = 42;
    let checkingCellNotAvaliable = 0;
   //check for draws
   for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
            if(board[i][j] == 1 || board[i][j] == 2){
                checkingCellNotAvaliable += 1;
            }
        }
    }

    if(checkingCellNotAvaliable === amountOfCells){
        console.log("draw")
        return true
    }




   //checking for top and bottom winners
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 6; j++){
            if( board[j][i] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;
            }
            if( board[j][i] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;
            }
            if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
            if( board[j][i] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;
            }
            if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
            }
        }
    }

   counterForPlayerOne = 0;
   counterForPlayerTwo = 0;

   //checking for right and left winners

    for(let i = 0; i < 6; i++){
        for( let j = 0; j < 7; j++ ){
            if( board[i][j] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;
            }
            if( board[i][j] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;
            }
            if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true
            }
            if( board[i][j] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;
            }
            if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
            }
        }
    }
    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;

    //diagnol
    //checking if paths are avalible relative to our position

    let topPath = true;
    let rightPath = true;
    let leftPath = true;
    let bottomPath = true;
    let diagnolTopRightPath = true;
    let diagnolTopLeftPath = true;
    let diagnolBottomLeftPath = true;
    let diagnolBottomRightPath = true;

    // cheking top path
    let orginalRowPosition = row;
    let orginalColumnPosition = column;

    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            topPath = false;
            break
        }
        row--
    }

    row = orginalRowPosition;
    column = orginalColumnPosition;

    // checking bottom path
    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            bottomPath = false;
            break
        }
        row++;
    }

    row = orginalRowPosition;
    column = orginalColumnPosition;

    //checking left path
    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            leftPath = false;
            break
        }
        column--;
    }

    row = orginalRowPosition;
    column = orginalColumnPosition;

    //chekcing right path
    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            rightPath = false;
            break
        }
        column++;
    }



    row = orginalRowPosition;
    column = orginalColumnPosition;

    //checking top-right diagnol path
    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            diagnolTopRightPath = false;
            break
        }
        row--;
        column++;
    }

    row = orginalRowPosition;
    column = orginalColumnPosition;

    //checking top-left diagnol path
    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            diagnolTopLeftPath = false;
            break
        }
        row--
        column--;
    }

    row = orginalRowPosition;
    column = orginalColumnPosition;

    //checking bottom-left diagnol path


    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            diagnolBottomLeftPath = false;
            break
        }
        row++;
        column--;
    }

    row = orginalRowPosition;
    column = orginalColumnPosition;


    //checking bottom-right diagnol path


    for(let i = 0; i < 4; i++){
        if( row < 0 || column < 0 || row >= board.length ||  column>= board[0].length){
            diagnolBottomRightPath= false;
            break
        }
        row++;
        column++;
    }

    row = orginalRowPosition;
    column = orginalColumnPosition;
//checking paths that are avaliable relative to our position and checking if there is a winner
// check top path
if(topPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return  true;
        }
        row--;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;

//checking bottom path

if(bottomPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
        }
        row++;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;


//checking right path

if(rightPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
        }
        column++;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;

//checking left

if(leftPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
        }
        column--;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;

//checking diagnol top right
if(diagnolTopRightPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
        }
        row--;
        column++;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;

//checking diagnol top-left
if(diagnolTopLeftPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
        }
        row--;
        column--;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;

//checking diagnol bottom left
if(diagnolBottomLeftPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
        }
        row++;
        column--;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;

//checking bottom right diagnol

if(diagnolBottomRightPath === true) {
    for(let i = 0; i < 4; i++){
        if( board[row][column] === 1  ){
                counterForPlayerOne +=1;
                counterForPlayerTwo = 0;

            }
        if(board[row][column] === 0 ){
                counterForPlayerOne = 0;
                counterForPlayerTwo = 0;

            }
        if(counterForPlayerOne >= 4){
                 console.log(`${player.playersGeneralName}  WINS` );
                 return true;
            }
        if( board[row][column] === 2){
                counterForPlayerTwo += 1;
                counterForPlayerOne = 0;

            }
        if(counterForPlayerTwo >=4 ){
                console.log(`${player.playersGeneralName}  WINS` );
                return true;
        }
        row++
        column++;
    }
}
    row = orginalRowPosition;
    column = orginalColumnPosition;

    counterForPlayerOne = 0;
    counterForPlayerTwo = 0;





}




function main () {
    let gameOver = false
    let inputIsFalse = true;
    do{
    gameOver = PLAYNEWROUND();
    if(gameOver == true){
       do{
       console.log("\n");
       let input4 = PROMPT("do you want to play again ( answer with yes or no): ");
       if(input4 == "yes"){
            gameOver = true;
            inputIsFalse = false;
            RESETBOARD();
       }
       else if(input4 == "no"){
        gameOver = false
        inputIsFalse = false;
       }
       else{
            inputIsFalse = true
       }
     }while(inputIsFalse == true)
    }

    }while(gameOver == false);
}



main()



