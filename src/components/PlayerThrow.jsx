import styles from '../styles/PlayerThrow.module.css'

const IMG = {
  rock: '/images/rock.png',
  paper: '/images/paper.png',
  scissors: '/images/scissors.png',
}

export default function PlayerThrow({ selected, onSelect }) {
  const choices = ['rock', 'paper', 'scissors']

  function handleKeyDown(e, choice) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(choice)
    }
  }

  return (
    <div className={styles.grid}>
      {choices.map((choice) => (
        <button
          key={choice}
          type="button"
          className={`${styles.card} ${selected === choice ? styles.selected : ''}`}
          onClick={() => onSelect(choice)}
          onKeyDown={(e) => handleKeyDown(e, choice)}
          aria-pressed={selected === choice}
        >
          <img src={IMG[choice]} alt={choice} />
        </button>
      ))}
    </div>
  )
}
