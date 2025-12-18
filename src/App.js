import React, { useState } from 'react'
import './App.css'

import rockImg from './assests/rock.png'
import paperImg from './assests/paper.png'
import scissorsImg from './assests/scissor.png'
import nailsImg from './assests/nail.png'
import hammerImg from './assests/hammer.png'
import woodImg from './assests/wood.png'
import glueImg from './assests/glue.png'

const choices = [
  { name: 'rock', img: rockImg },
  { name: 'paper', img: paperImg },
  { name: 'scissors', img: scissorsImg },
  { name: 'nails', img: nailsImg },
  { name: 'hammer', img: hammerImg },
  { name: 'wood', img: woodImg },
  { name: 'glue', img: glueImg },
]

const rules = {
  rock: {
    beats: ['scissors', 'wood'],
    losesTo: ['paper', 'glue', 'hammer'],
  },
  paper: {
    beats: ['rock', 'hammer'],
    losesTo: ['scissors', 'nails', 'glue'],
  },
  scissors: {
    beats: ['paper', 'glue'],
    losesTo: ['rock', 'hammer', 'nails'],
  },
  nails: {
    beats: ['paper', 'scissors', 'wood'],
    losesTo: ['rock', 'hammer', 'glue'],
  },
  hammer: {
    beats: ['rock', 'scissors', 'nails'],
    losesTo: ['paper', 'glue', 'wood'],
  },
  wood: {
    beats: ['hammer', 'paper'],
    losesTo: ['rock', 'nails', 'scissors'],
  },
  glue: {
    beats: ['paper', 'rock', 'hammer'],
    losesTo: ['scissors', 'nails', 'wood'],
  },
}

const App = () => {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('')
  const [animating, setAnimating] = useState(false)
  const [scores, setScores] = useState({ player: 0, computer: 0, ties: 0 })
  const [round, setRound] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const maxRounds = 10

  const playGame = (choice) => {
    setPlayerChoice(choice)
    setAnimating(true)
    setTimeout(() => {
      const compChoice = choices[Math.floor(Math.random() * choices.length)]
      setComputerChoice(compChoice)
      setAnimating(false)
      const winner = determineWinner(choice.name, compChoice.name)
      updateScores(winner)
      setRound((r) => r + 1)
      if (round >= maxRounds) {
        setGameOver(true)
      }
    }, 1000)
  }

  const determineWinner = (player, computer) => {
    if (player === computer) {
      setResult("It's a tie!")
      return 'tie'
    }
    if (rules[player].beats.includes(computer)) {
      setResult('You win!')
      return 'player'
    }
    if (rules[player].losesTo.includes(computer)) {
      setResult('Computer wins!')
      return 'computer'
    }

    setResult("It's a tie!")
    return 'tie'
  }

  const updateScores = (winner) => {
    setScores((prev) => ({
      ...prev,
      [winner]: prev[winner] + 1,
    }))
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult('')
    setScores({ player: 0, computer: 0 })
    setRound(1)
    setGameOver(false)
  }

  const getGameStatus = () => {
    if (gameOver) {
      if (scores.player > scores.computer) return 'You won the game!'
      if (scores.computer > scores.player) return 'Computer won the game!'
      return "It's a draw!"
    }
    return `Round ${round} of ${maxRounds}`
  }

  const instructions = [
    {
      move: 'Rock',
      beats: 'Scissors (crushes), Wood (smashes)',
      losesTo: 'Paper (covers), Glue (sticks), Hammer (smashes rock)',
    },
    {
      move: 'Paper',
      beats: 'Rock (covers), Hammer (wraps)',
      losesTo: 'Scissors (cuts), Nails (pierce), Glue (sticks)',
    },
    {
      move: 'Scissors',
      beats: 'Paper (cuts), Glue (snips apart)',
      losesTo: 'Rock (crushes), Hammer (breaks), Nails (tougher)',
    },
    {
      move: 'Nails',
      beats: 'Paper (pierces), Scissors (stronger), Wood (drives into)',
      losesTo: 'Rock (bends), Hammer (pounds), Glue (sticks together)',
    },
    {
      move: 'Hammer',
      beats: 'Rock (smashes), Scissors (breaks), Nails (pounds)',
      losesTo: 'Paper (wraps), Glue (sticks), Wood (absorbs blows)',
    },
    {
      move: 'Wood',
      beats: 'Hammer (absorbs), Paper (covers)',
      losesTo: 'Rock (smashes), Nails (driven in), Scissors (cuts)',
    },
    {
      move: 'Glue',
      beats: 'Paper (sticks), Rock (sticks), Hammer (sticks)',
      losesTo: 'Scissors (snip apart), Nails (pierce), Wood (absorbs)',
    },
  ]

  return (
    <div className="app">
      <h1>Jack n Poy</h1>
      <h4>Rock, Paper, Scissors, Nails, Hammer, Wood, Glue</h4>
      <div className="hud">
        <div className="scoreboard">
          <p>Player: {scores.player}</p>
          <p>Computer: {scores.computer}</p>
        </div>
        <div className="status">{getGameStatus()}</div>
      </div>

      {!gameOver && (
        <div className="choices">
          {choices.map((choice) => (
            <button
              key={choice.name}
              className={`choice ${animating ? 'animating' : ''}`}
              onClick={() => playGame(choice)}
              disabled={animating}
            >
              <img src={choice.img} alt={choice.name} className="choice-img" />
              <p>
                {choice.name.charAt(0).toUpperCase() + choice.name.slice(1)}
              </p>
            </button>
          ))}
        </div>
      )}

      <div className="results">
        {playerChoice && (
          <div className="choice-display">
            <p>Your choice:</p>
            <img
              src={playerChoice.img}
              alt={playerChoice.name}
              className="result-img"
            />
          </div>
        )}
        {computerChoice && (
          <div className="choice-display">
            <p>Computer's choice:</p>
            <img
              src={computerChoice.img}
              alt={computerChoice.name}
              className="result-img"
            />
          </div>
        )}
        {result && <p className="result">{result}</p>}
      </div>

      <button className="reset" onClick={resetGame}>
        New Game
      </button>

      <section className="instructions">
        <div className="instruction-table-wrapper">
          <h2>Instructions</h2>
          <table>
            <thead>
              <tr>
                <th>Move</th>
                <th>Beats</th>
                <th>Loses To</th>
              </tr>
            </thead>
            <tbody>
              {instructions.map(({ move, beats, losesTo }) => (
                <tr key={move}>
                  <td>
                    <b>{move}</b>
                  </td>
                  <td>{beats}</td>
                  <td>{losesTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default App
