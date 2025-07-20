let gameBoard = new Array(9," ");

let player1 ="X";
let player2 = "Y";


function takesCordinate(){
    let x,y;
    let temp;

    for(let i = 0; i < 9 ;i++){
        if(i%2==0){
            console.log("Enter your coordinate player 1:");
            temp = player1;
        }
        else{
            console.log("Enter your coordinate player 2:");
            temp = player2;

        }
        x = Number.parseInt(prompt("Enter the X co0rdinate"));
        y = Number.parseInt(prompt("Enter the Y coordinate"));
        gameBoard[x*3 + y] = temp;

        let message = checkWinner(temp);
        let str = "";

        for(let j = 0; j < 3;j++){
            for(let k =0; k<3;k++){
                str += (gameBoard[j*3+k]);
            }
            str += "\n";

        }
        alert(str);


        if(message != ""){
            if(temp ===player1){
                alert("player 1 wins the game");
                alert(`with ${message}`);

            }
            else{
                alert("player 2 wins the game");
                alert(`with ${message}`);

            }
            break;
        }
    }
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

    return "";
}


takesCordinate();