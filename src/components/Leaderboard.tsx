interface leaderboardProps {
  leaderboard: Array<{ player: string; score: number }>;
}

function Leaderboard(props: leaderboardProps): JSX.Element {
  const lead = props.leaderboard;

  return (
    <table className="table table-striped mb-3">
      <thead>
        <tr>
          <td>Name</td>
          <td>Score</td>
        </tr>
      </thead>
      <tbody>
        {lead.map((item) => {
          return (
            <tr key={Math.random()}>
              <td>{item.player}</td>
              <td>{item.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Leaderboard;
