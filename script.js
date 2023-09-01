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
            clickedSquare.classList.add("my-font-style");
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

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
          board[i] = "";
        }
      };

    return {board,isTheBoardOccupied,checkWin,resetBoard};

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


const choosePlayer = (() => {
    const buttonO = document.querySelector(".O");
    const buttonX = document.querySelector(".X");
    
    buttonO.addEventListener("click", () => {
        resetEverything();  
        playGame.setPlayerOne("O");  
        playGame.setPlayerTwo("X"); 
    });
    
    buttonX.addEventListener("click", () => {
        resetEverything(); 
        playGame.setPlayerOne("X");  
        playGame.setPlayerTwo("O");  
    });
})();


const playGame = (() => {

    playerOne = Player("O") 
    playerTwo = Player("X")
    let round = 1

    const setPlayerOne = (symbol) => {
        playerOne = Player(symbol);
    };
    
    const setPlayerTwo = (symbol) => {
        playerTwo = Player(symbol);
    };

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
    const resetGame = () => {
        round = 1;
      };


    return {getCurrentRound,getCurrentPlayerSymbol, updateRound,getLastPlayerSymbol,resetGame,setPlayerOne,setPlayerTwo};

})();



const displayController = (() => {

    const showModal = (text) => {
        const modal = document.getElementById("myModal");
        const span = document.getElementsByClassName("close")[0];
        const modalText = document.getElementById("modal-text");
      
        modalText.textContent = text;
        modal.style.opacity = 1;  // set opacity to 1
        modal.style.display = "block";

      
        span.onclick = () => {
          modal.style.display = "none";
          resetEverything();
        };
      
        window.onclick = (event) => {
          if (event.target === modal) {
            modal.style.display = "none";
            resetEverything();
          }
        };
      };
      

    const resetDisplay = () => {
        squareElement.forEach((square) => {
          square.textContent = "";
        });
      };

    const board = gameBoard.board
    const squareElement = document.querySelectorAll(".square");
    const resetButton = document.querySelector(".reset")

    resetButton.addEventListener("click", ()=>{
        resetEverything()
    })

    squareElement.forEach((squareElement) => {
        squareElement.addEventListener("click", (event) => {
            const clickedSquare = event.target;
            const squareId = clickedSquare.id;
            if (gameBoard.isTheBoardOccupied(squareId,clickedSquare)){
                playGame.updateRound();
            }
            if (gameBoard.checkWin(board,playGame.getLastPlayerSymbol()) === "win"){
                showModal(`GAME OVER, ${playGame.getLastPlayerSymbol()} has won the game`);
            } else if (gameBoard.checkWin(board,playGame.getLastPlayerSymbol()) === "draw"){
                showModal("IT'S A DRAW");
            }
        });
    });
    return {resetDisplay};
})();




const resetEverything = () => {
    gameBoard.resetBoard();
    playGame.resetGame();
    displayController.resetDisplay();
  };