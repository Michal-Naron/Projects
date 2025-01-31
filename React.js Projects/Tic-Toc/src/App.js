import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYER = { X: "Player1", O: "Plyaer2" };

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [player, setPlayer] = useState(PLAYER);
  const [symbolPlayer, setSymbolPlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let boardGame = [...initialGameBoard.map((el) => [...el])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    boardGame[row][col] = player;
  }
  console.log(boardGame);
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      boardGame[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      boardGame[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      boardGame[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelctedSquare(indexRow, indexCol) {
    //setSymbolPlayer((symbol) => (symbol === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      //if(prevTurns.find(el=> el.square.row==indexRow))
      const updatedPrevTurns = [
        { square: { row: indexRow, col: indexCol }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedPrevTurns;
    });
  }

  function startOver() {
    setGameTurns([]);
  }
  function handlePlayerNewName(symbol, newName) {
    setPlayer((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  }
  return (
    <menu>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            newWinnerName={handlePlayerNewName}
          />
          <Player
            name={PLAYER.O}
            symbol="O"
            isActive={activePlayer === "O"}
            newWinnerName={handlePlayerNewName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} startAgain={startOver} />
        )}
        <GameBoard changeSymbol={handleSelctedSquare} board={boardGame} />
      </div>
      <Log turns={gameTurns}></Log>
    </menu>
  );
}

export default App;
