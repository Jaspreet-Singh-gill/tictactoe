const GameBoard = (function(){
    let gameBoard = new Array(9);
    for(let i = 0; i< 9;i++){
        gameBoard[i] = " ";
    }

    let player1;
    let player2;
    let player1Name;
    let player2Name;
    let result;
    function getTheResult(){
        return result;
    }

    let i = 0;

    function returnValue(index){
        return gameBoard[index];
    }

    function getPlayerName(){
        return {"one":player1Name,"two":player2Name};
    }

    function playerChoice(p1name,p2Name,choice1,choice2){
        player1 = choice1;
        player2 = choice2;
        player1Name = p1name;
        player2Name = p2Name;
    }


    function takesCordinate(x,y){
            let temp;

            if(i%2==0){
                // console.log("Enter your coordinate player 1:");
                temp = player1;
            }
            else{
                // console.log("Enter your coordinate player 2:");
                temp = player2;

            }
            gameBoard[x*3 + y] = temp;

            let message = checkWinner(temp);
            // let str = "";

            // for(let j = 0; j < 3;j++){
            //     for(let k =0; k<3;k++){
            //         str += (gameBoard[j*3+k]);
            //     }
            //     str += "\n";

            // }
            // alert(str);


            if(message != "none"){
                if(temp ===player1){
                    result = {"won":"player 1","message" :`you won the game with ${message}`,
                                "name":player1Name};
                    return;

                }
                else{
                    result = {"won":"player 2","message" :`you won the game with ${message}`,
                                "name":player2Name};
                    return;

                }


                
            }
            i++;

            if(i==9){
                    result = "Tie";
                    return;
            }

            
            result = "";

    }


    function checkWinner(char){
        //Row wise check
        for(let i =0; i< 3;i++){
            let countRow = 0;
            let countCol = 0;
            for(let j = 0; j <3;j++){
                if(gameBoard[i*3 +j] == char){
                    countRow++;
                }

                if(countRow == 3){
                    return "3 in a row";
                }

                if(gameBoard[j*3 +i] == char){
                    countCol++;
                }

                if(countCol == 3){
                    return "3 in a column";
                }


            }
        }

        let countL = 0;
        let countR = 0;
        for(let i = 0; i <3;i++){
            
            if(gameBoard[i*3+i] == char){
                countL++;
            }
            if(gameBoard[(2-i)*3 +i] == char){
                countR++;
            }
        }

        if(countL == 3){
            return "left diagonal";
        }
        else if(countR ==3){
            return "right diagonal";
        }

        return "none";
    }

    function reset(){
        for(let i = 0; i< 9;i++){
            gameBoard[i] = "";
        }

        i = 0;
        player1 = undefined;
        player2 = undefined;
        result = "";
        player1Name = "";
        player2Name = "";


    }

    return{playerChoice,takesCordinate,checkWinner,reset,getPlayerName,returnValue,getTheResult}
})();

let buttons = document.querySelectorAll(".battleGrid>button");
function showTheStartbox(){
  
    buttons.forEach(function(item,index){
        item.textContent = "";
    });
    GameBoard.reset()

    let box = document.querySelector(".start")
    box.showModal();

    let boxSubmit = document.querySelector(".start form");
    boxSubmit.addEventListener("submit",fillThedetail);

}


function gamePlay(){
    let left = document.querySelector(".player>.left>span");
    let right = document.querySelector(".player>.right>span");
    let player = GameBoard.getPlayerName();
    left.textContent = player.one;
    right.textContent = player.two;
    console.log(left.textContent);
}


function showTieBox(){
    let tie = document.querySelector(".tie");
    tie.showModal();
    let button = tie.querySelector("button");
    button.addEventListener("click",function(){
    tie.close();
    buttons.forEach(function(item,index){
        item.textContent = "";
    });
    GameBoard.reset();
    let player1Name =document.querySelector(`.tie>form>.left>#Player1`);
    let player2Name =document.querySelector(`.tie>form>.right>#Player2`);
    let symbol1 = document.querySelectorAll(`.tie .left>.selector input[type ="radio"]`);
    let symbol2 = document.querySelectorAll(`.tie .right>.selector input[type ="radio"]`);
    let x,y;
    symbol1.forEach(function(item){
        if(item.checked){
            x = item.value;
        }
    });
    symbol2.forEach(function(item){
        if(item.checked){
            y = item.value;
        }
    });
    GameBoard.playerChoice(player1Name.value,player2Name.value,x,y);
    gamePlay();




    });
}


function showResultBox(val){
    let victory = document.querySelector(".victory");
    victory.showModal();
    let player = victory.querySelector(".player");
    let playerName = victory.querySelector(".playerName");
    let message = victory.querySelector(".message");
    player.textContent = val.won;
    playerName.textContent = val.name;
    message.textContent = val.message;
    let button = victory.querySelector("button");
    button.addEventListener("click",function(){
        victory.close();
        showTheStartbox();
    });

}




function activeButtons(){

    buttons.forEach(function(item,index){
        item.addEventListener("click",function(){
            GameBoard.takesCordinate(Number.parseInt(item.value),index%3);
            item.textContent = GameBoard.returnValue(index);
            if(GameBoard.getTheResult() === "Tie"){
                showTieBox();
            }
            else if(GameBoard.getTheResult() != ""){
                showResultBox(GameBoard.getTheResult());
            }
        });
    });
}





function fillThedetail(){
    let player1Name =document.querySelector(`.start>form>.left>#Player1`);
    let player2Name =document.querySelector(`.start>form>.right>#Player2`);
    let symbol1 = document.querySelectorAll(`.start .left input[type ="radio"]`);
    let symbol2 = document.querySelectorAll(`.start .right input[type ="radio"]`);
    let x,y;
    symbol1.forEach(function(item){
        if(item.checked){
            x = item.value;
        }
    });
    symbol2.forEach(function(item){
        if(item.checked){
            y = item.value;
        }
    });
    GameBoard.playerChoice(player1Name.value,player2Name.value,x,y);
    gamePlay();

}

activeButtons();


showTheStartbox();
