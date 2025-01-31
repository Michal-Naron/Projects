import { useState } from "react";

export default function GameBoard({ changeSymbol, board }) {
  // const [boardGame, setBoradGame] = useState(initialGameBoard);
  // function chosePlace(row, el) {
  //   setBoradGame((oldBoard) => {
  //     const updatedBoard = [...oldBoard.map((el) => [...el])];
  //     updatedBoard[row][el] = activeSymbol;
  //     return updatedBoard;
  //   });

  //   changeSymbol();
  // }
  return (
    <ol id="game-board">
      {board.map((row, indexrow) => (
        <ol key={indexrow}>
          {row.map((el, indexEl) => (
            <li key={indexEl}>
              <button
                onClick={() => changeSymbol(indexrow, indexEl)}
                disabled={el !== null}
              >
                {el}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
}
