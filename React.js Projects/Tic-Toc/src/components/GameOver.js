export default function GameOver({ winner, startAgain }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>winner is {winner}</p>}
      {!winner && <p>It is draw</p>}
      <p>
        <button onClick={startAgain}>Rematch</button>
      </p>
    </div>
  );
}
