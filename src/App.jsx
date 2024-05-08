import { useState, useEffect } from 'react'
import './App.css'

const getBoard = () => Array(9).fill(null);

function App() {
  const [Board, setBoard] = useState(getBoard());
  const [isNext, setisNext] = useState(false);
  const [winner, setWinner] = useState(null)
  const [message, setMessage] = useState("Player X turn");

  const resetGame = () => {
    setBoard(getBoard())
    setisNext(false)
    setWinner(null)
    setMessage("Player X turn")
  }

  const WINNING_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const checkWinner = () => {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const [a, b, c] = WINNING_PATTERN[i];
      if (Board[a] && Board[a] === Board[b] && Board[a] === Board[c]) {
        return Board[a];
      }
    }
    return false;
  }


  const handeClick = (i) => {
    // the below code runs when empty cells are clicked as well as winner is not found
    if (Board[i] == null && winner == null) {
      let newBoard = [...Board];
      if (!isNext) {
        // player x turn:
        newBoard[i] = "X";
        setMessage("Player O turn")
      } else {
        // else player y turn
        newBoard[i] = "O";
        setMessage("Player X turn")
      }
      setBoard(newBoard)
      // switch player turn
      setisNext(!isNext);
    }
  }

  useEffect(() => {
    // check for winner when board data changes:
    const win = checkWinner();
    if (win) {
      setMessage("The winner is: " + win)
      setWinner(win)
    } else if (!Board.includes(null)) {
      setMessage("The game is Draw!")
    }
  }, [Board])

  return (
    <>
      <div className="flex">
        <h2 className='title'>Tic Tac Toe</h2>
        <div>
          {message}
        </div>
        <div >
          <button className="reset"
          onClick={resetGame}>Reset</button>
        </div>
        <div className="board">
          {Board.map((_, i) => {
            return <button onClick={() => handeClick(i)} key={i} className="cell"  >{Board[i]}</button>
          })}
        </div>
      </div>
    </>
  )
}

export default App
