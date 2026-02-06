import {useState} from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players){
  let winner = null;

  for(const win of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[win[0].row][win[0].column];
    const secondSquareSymbol = gameBoard[win[1].row][win[1].column];
    const thirdSquareSymbol = gameBoard[win[2].row][win[2].column];

    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;

}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActive] = useState('X'); (Not required as we already have a state whenever a button is clicked)
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex, colIndex){
    // setActive((currActive) => currActive === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square : {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    });
  }


  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* PLAYERS */}
        <ol id="players" className="highlight-player">
          <Player 
          initialName={PLAYERS.X}
          symbol="X" 
          isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}
          />

          <Player 
          initialName={PLAYERS.O}
          symbol="O" 
          isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}

        <GameBoard onSelectSquare={handleSelectSquare}
        board={gameBoard}/>

      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App
