import { useState, useMemo } from 'react'
import PlayerThrow from './components/PlayerThrow.jsx'
import ComputerThrow from './components/ComputerThrow.jsx'
import ResultDisplay from './components/ResultDisplay.jsx'
import ScoreBoard from './components/ScoreBoard.jsx'

const CHOICES = ['rock', 'paper', 'scissors']
const BEATS = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [compDisplay, setCompDisplay] = useState(null)
  const [isShuffling, setIsShuffling] = useState(false)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 })

  const resultText = useMemo(() => {
    if (!result) return ''
    return result === 'win'
      ? 'You win!'
      : result === 'lose'
      ? 'You lose!'
      : 'Tie!'
  }, [result])

  function decideOutcome(p, c) {
    if (p === c) return 'tie'
    return BEATS[p] === c ? 'win' : 'lose'
  }

  function handleSelect(choice) {
    if (isShuffling) return

    setPlayerChoice(choice)
    setResult(null)
    setComputerChoice(null)
    setIsShuffling(true)

    let i = 0
    setCompDisplay(CHOICES[i % 3])

    const interval = setInterval(() => {
      i++
      setCompDisplay(CHOICES[i % 3])
    }, 500)

    const timeout = setTimeout(() => {
      clearInterval(interval)

      const finalPick = CHOICES[Math.floor(Math.random() * CHOICES.length)]
      setComputerChoice(finalPick)
      setCompDisplay(finalPick)

      const outcome = decideOutcome(choice, finalPick)
      setResult(outcome)

      setScore((prev) => ({
        wins: prev.wins + (outcome === 'win' ? 1 : 0),
        losses: prev.losses + (outcome === 'lose' ? 1 : 0),
        ties: prev.ties + (outcome === 'tie' ? 1 : 0),
      }))

      setIsShuffling(false)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }

  function handleReset() {
    setPlayerChoice(null)
    setComputerChoice(null)
    setCompDisplay(null)
    setResult(null)
    setScore({ wins: 0, losses: 0, ties: 0 })
    setIsShuffling(false)
  }

  return (
    <div className="app">
      <header>
        <h1>Rock Paper Scissors Game, GO!</h1>
      </header>

      <main>
        <section>
          <h2>Your Throw</h2>
          <PlayerThrow selected={playerChoice} onSelect={handleSelect} />
        </section>

        <section>
          <h2>Computer Throw</h2>
          <ComputerThrow displayedChoice={compDisplay} isShuffling={isShuffling} />
        </section>

        <section>
          <h2>Outcome</h2>
          <ResultDisplay
            playerChoice={playerChoice}
            computerChoice={computerChoice}
            result={result}
          />
          <p className="sr-only" aria-live="polite">{resultText}</p>
        </section>

        <section>
          <h2>Scoreboard</h2>
          <ScoreBoard wins={score.wins} losses={score.losses} ties={score.ties} />
          <button className="resetBtn" onClick={handleReset}>Reset</button>
        </section>
      </main>
    </div>
  )
}
