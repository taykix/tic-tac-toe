/**
    Plan: I am starting with no plan at all so don't judge me.
    I read "Building A House From The Inside" artikel on TOP first i will chop this problem into managable parts
    According to the article, it is a better approach to first code the logic of the game after handle the DOM operations

    Things I need:
    -2D array (Board)
        -Board needs to filled with Cells
    -Players
    -Cell
    -GameController.
    -Display Controller

**/

function Cell() {
    let symbol = ".";

    const changeSymbol = (playerSymbol) => {
        symbol = playerSymbol;
    };

    const getSymbol = () => symbol;

    return {
        changeSymbol,
        getSymbol,
    };
}

function Player(playerName, playerSymbol) {
    let symbol = playerSymbol;
    let score = 0;
    let name = playerName;

    const getScore = () => score;
    const addScore = () => {
        score++;
    };
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getScore,
        addScore,
        getName,
        getSymbol,
    }

}

function Gameboard() {
    const rows = 3;
    const colums = 3;
    const board = [];

    for(let i = 0; i < rows; i++)
    {
        board[i] = [];
        for (let j = 0; j < colums; j++)
        {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let strRow = "";
            for(let j = 0; j < board[i].length; j++) {
                strRow = strRow + board[i][j].getSymbol();
            }
            console.log( strRow + "\n");
        }
        /*
        board.forEach((row) => {
            row.forEach((item) => console.log(item.getSymbol()));
            console.log("\n");
        });
        */
    }

    const isGameFinished = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].getSymbol() === ".")
                    return false
            }
        }
        return true;
    }

    const isPlayerWon = (playerSymbol) => {
        const checkHorizontal = (playerSymbol) => {
            for (let i = 0; i < board.length; i++) {
                let symbolCounter = 0;
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j].getSymbol() === playerSymbol)
                        symbolCounter++;
                }
                if (symbolCounter == 3)
                    return true;
            }
            return false;
        }
        
        const checkVertical = (playerSymbol) => {
            for (let i = 0; i < board.length; i++) {
                let symbolCounter = 0;
                for (let j = 0; j < board[i].length; j++) {
                    if (board[j][0].getSymbol() === playerSymbol)
                        symbolCounter++;
                }
                if (symbolCounter == 3)
                    return true;
            }
            return false;
        }
        
        //hire I am using Diagonal Traverse algorthm
        const checkDiagonal = (playerSymbol) => {

            if ((board[0][0].getSymbol() === playerSymbol &&
                board[1][1].getSymbol() === playerSymbol &&
                board[2][2].getSymbol() === playerSymbol) 
                ||
                (board[0][2].getSymbol() === playerSymbol &&
                board[1][1].getSymbol() === playerSymbol &&
                board[2][0].getSymbol() === playerSymbol))
                return true;
            return false;
        }

        if (checkDiagonal(playerSymbol) || checkVertical(playerSymbol) || checkHorizontal(playerSymbol))
            return true;
        return false;
    }

    const changeCell = (row, column, playerSymbol) => {
        if (board[row][column].getSymbol() === ".")
            board[row][column].changeSymbol(playerSymbol);
        else
            return false;

        return true;
    };

   return {
    changeCell,
    printBoard,
    getBoard,
    isGameFinished,
    isPlayerWon,
   } 
};

function GameController() {
    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");

    const board = Gameboard();

    let currentPlayer = playerOne;

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const getCurrentPlayer = () => currentPlayer;

    const printRound = () => {
        board.printBoard();
        console.log(`${getCurrentPlayer()}'s turn. Please select a area`);
    }

    const getSelectedCell = () => {
        let userInput = prompt("Array icin pozisyon gir. Örn: 1,2");
        let inputs = userInput.split(",");
        let row = parseInt(inputs[0]);
        let column = parseInt(inputs[1]);

        return {row, column};
    }

    const playRound = () => {
        printRound();
        let selectedCells = getSelectedCell();
        //If user chooses already chosed place, we play round again.
        if (!board.changeCell(selectedCells.row, selectedCells.column, getCurrentPlayer().getSymbol())) {
            console.log("You selected already selected place. Please Select Free Place");
            playRound();
            return;
        }
    }

    const playGame = () => {
        while(!board.isGameFinished()) {
            playRound();
            //If one player won after playing we display a message and stop.
            if (board.isPlayerWon(getCurrentPlayer().getSymbol())) {
                console.log(`${getCurrentPlayer()} with the symbol ${getCurrentPlayer().getSymbol()} has won the game !\n
                            Game Finished.!`);
                break;
            }
            switchPlayerTurn();
        }
    }

    playGame();

    return {
        switchPlayerTurn,
        getCurrentPlayer,
        printRound,
        getSelectedCell,
        playRound,
        playGame,
    }
}

const game = GameController();

