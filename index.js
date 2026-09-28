/*

Author: Jose Mondragon


Date: 9/28/26


Description: connect four game



*/

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

//mark square or spot

const MARKCOLUMN = (column,player) =>{
    //filter is used as a length to measure the avaible squares for a column, then we map it with the values at said position to get
    //the column as an array

    let rowsWithCells = board.filter( (row) => row[column] === 0).map( row => row[column]);

    // if lenght is zero then return
    if(!rowsWithCells.length) {
        return
    }

    board[rowsWithCells.length-1][column] = player.value;

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
    let input3;
    do{
        input3 = Number(PROMPT("choose a column to drop the token: "));
        if(input3 < 1 || input3 > 7 || Number.isNaN(input3)){
            console.log("try again");
            continue
}
        falseInput = false;

    }while( falseInput == true)

    MARKCOLUMN(input3-1, GETACTIVEPLAYER())
    SWITCHACTIVEPLAYER()



}







