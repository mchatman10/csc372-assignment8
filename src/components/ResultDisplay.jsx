import styles from '../styles/ResultDisplay.module.css'

const pretty = (v) => (v ? v[0].toUpperCase() + v.slice(1) : '...')

export default function ResultDisplay({ playerChoice, computerChoice, result }) {
  return (
    <div className={styles.resultBox}>
      <p>
        <strong>You:</strong> {pretty(playerChoice)} &nbsp;|&nbsp;
        <strong>Computer:</strong> {pretty(computerChoice)}
      </p>

      <h3 className={styles.outcome}>
        {result === 'win'
          ? 'You win!'
          : result === 'lose'
          ? 'You lose!'
          : result === 'tie'
          ? 'Tie!'
          : '...'}
      </h3>
    </div>
  )
}
