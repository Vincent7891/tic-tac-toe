const Player = (symbol) => {
    const getSymbol = () => {
        return symbol;
    };
    return {getSymbol};
};

const gameBoard = (() => {
    const board = ["","","","","","","","",""]

    const isTheBoardOccupied = ((squareId,clickedSquare) => {
        if (board[squareId] === ""){
            clickedSquare.textContent = playGame.getCurrentPlayerSymbol();
            board[parseInt(squareId)] = playGame.getCurrentPlayerSymbol();
            return true
        }
        else {
            stylingFunctions.changeBackgroundColor(clickedSquare)
        }
    })

    const checkWin = ((board,symbol) => {
        const winningCombination = [

            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        
            // Diagonals
            [0, 4, 8],
            [2, 4, 6]
        ];

        if (playGame.getCurrentRound() === 10){
            return "draw"
        }
        for (let i =0; i < winningCombination.length; i++){
            const [a,b,c] = winningCombination[i];
            if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
                return "win";
            }
        }
        return "continue"
    })
    return {board,isTheBoardOccupied,checkWin};

})();

const stylingFunctions = (() => {
    const changeBackgroundColor = ((element) => {
        element.classList.add('transition-bg');
        element.style.backgroundColor = "red";

        setTimeout(function() {
          element.style.backgroundColor = ""; 
        }, 250);

         setTimeout(() => {
            element.classList.remove('transition-bg');
        }, 500);

    })
    return {changeBackgroundColor}
})();

const playGame = (() => {

    playerOne = Player("X")
    playerTwo = Player("O")
    let round = 1

    const getCurrentPlayerSymbol = (() => {
        return round % 2 === 1 ? playerOne.getSymbol() : playerTwo.getSymbol();
    });

    const getLastPlayerSymbol = (() => {
        return round % 2 === 1 ? playerTwo.getSymbol() : playerOne.getSymbol();
    });

    const updateRound = () => {
        round++;
    };


    const getCurrentRound = (()=> {
        return round
    })


    return {getCurrentRound,getCurrentPlayerSymbol, updateRound,getLastPlayerSymbol};

})();

const displayController = (() => {
    const board = gameBoard.board
    const squareElement = document.querySelectorAll(".square");

    squareElement.forEach((squareElement) => {
        squareElement.addEventListener("click", (event) => {
            const clickedSquare = event.target;
            const squareId = clickedSquare.id;
            if (gameBoard.isTheBoardOccupied(squareId,clickedSquare)){
                playGame.updateRound();
            }
            console.log(playGame.getCurrentRound())
            if(gameBoard.checkWin(board,playGame.getLastPlayerSymbol()) === "win"){
                document.querySelector(".header").textContent= `GAME OVER, ${playGame.getLastPlayerSymbol()} has won he game`
            } else if (gameBoard.checkWin(board,playGame.getLastPlayerSymbol()) === "draw"){
                document.querySelector(".header").textContent= `IT'S A DRAW`
            }
        });
    });
})();




