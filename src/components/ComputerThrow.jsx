import styles from '../styles/ComputerThrow.module.css'

const IMG = {
  rock: '/images/rock.png',
  paper: '/images/paper.png',
  scissors: '/images/scissors.png',
  question: '/images/question-mark.png',
}

export default function ComputerThrow({ displayedChoice, isShuffling }) {
  const src = displayedChoice ? IMG[displayedChoice] : IMG.question
  const label = displayedChoice || 'unknown'

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.frame} ${isShuffling ? styles.shaking : ''}`}>
        <img src={src} alt={`computer chose: ${label}`} />
      </div>

      <p className={styles.status} aria-live="polite">
        {isShuffling ? 'Thinking…' : displayedChoice ? `Chose ${label}` : 'Waiting...'}
      </p>
    </div>
  )
}
