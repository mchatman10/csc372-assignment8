import styles from '../styles/ScoreBoard.module.css'

export default function ScoreBoard({ wins, losses, ties }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Wins</th>
          <th>Losses</th>
          <th>Ties</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{wins}</td>
          <td>{losses}</td>
          <td>{ties}</td>
        </tr>
      </tbody>
    </table>
  )
}
