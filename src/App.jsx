import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import GameOver from './components/GameOver'
import { WINNING_COMBINATIONS } from './winning-combinations'
import gameLogo from "/game-logo.png"

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INIT_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X"
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INIT_GAME_BOARD.map(element => [...element])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}

function deriveWinner(gameBoard, players){
  let winner = null

  for (const combination of WINNING_COMBINATIONS) {
    
    const firstSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSquare = gameBoard[combination[1].row][combination[1].column]
    const thirdSquare = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquare && 
      firstSquare === secondSquare && 
      firstSquare == thirdSquare
    ) {
      winner = players[firstSquare]
    }
  }
  return winner
}

function App() { 
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns ] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players) 


  let hasDraw = gameTurns.length === 9 && !winner

  const handleSelectActivePlayer = (rowIndex, colIndex) => {
    // setActivePlayer(currentPlayer => ((currentPlayer === "X") ? "O" : "X"))
    setGameTurns(preTurns => {
      const currentPlayer = deriveActivePlayer(preTurns)

      const updateTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer
        }, ...preTurns
      ]
      return updateTurns
    })  
  }

  const handleRematch = () => {
    setGameTurns([])
  }

  function handleChangePlayer (symbol, newName) {
    setPlayers(pre => { 
      return {
        ...pre, 
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div className='top'>
        <img src={gameLogo} alt='game logo' className='logo' />
        <h2>React Tic-Tac-Toe</h2>
      </div>

      <div id="game-container">               
        <ol id="players" className='highlight-player'>        
          <Player initName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handleChangePlayer} />
          <Player initName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handleChangePlayer} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard 
          onSelectActivePlayer = {handleSelectActivePlayer} 
          board={gameBoard}
        />
      </div>    
      <Log turns = {gameTurns} />
    </main>
  )
}

export default App
