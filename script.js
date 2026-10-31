
/*
gameboard - an array stored inside of a gameboard object

players - stored in objects

game flow controller - object

main goal: as little globalcode as possible

tuck as much as i can inside the factroy functions

if i only need a single instance of something. (game board, displaycontroller, wrap the factory inside an IIFE so that it cannot be used to create additional instances)
*/

function Gameboard(){
    const board = [
        "0", "0", "0",
        "0", "0", "0",
        "0", "0", "0"
    ];



    const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];


  const checkWin = () => {
    for (let combo of WINNING_COMBOS){
        const [a, b, c] = combo;
        if (board[a] !== "0" && board[a] === board[b] && board[a] === board[c]){
            return board[a];
        }
    }
    return null;
  }


    const getBoard = () => board;
    const chooseBox = (box, player) => {
        if (board[box] != "0"){
            return false;
        }
        else{
            board[box] = player;
            return true;
        }
    }

    const printBoard = () => {
        console.log(`${board[0]} | ${board[1]} | ${board[2]}`)
        console.log(`${board[3]} | ${board[4]} | ${board[5]}`)
        console.log(`${board[6]} | ${board[7]} | ${board[8]}`)
    }

    return {getBoard, chooseBox, checkWin, printBoard};
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    const game = Gameboard()

    const players = [
        {
            name: playerOneName,
            value: 'X',
        },
        {
            name: playerTwoName,
            value: 'O',
        }
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
  
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = ()  => {
        game.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);

    };


    const playRound = (box) => {
        const moveSuccessful = game.chooseBox(box, getActivePlayer().value);

        if (!moveSuccessful){
            console.log("Invalid move! Still your turn.");
            return;
        }

        const winner = game.checkWin();

        if(winner){
            game.printBoard();
            console.log(`${getActivePlayer().name} wins!`);
            // Handle game over logic here
            return;
        }
        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: game.getBoard,
    }
}




const NBA = GameController('Lebron', 'Luka');