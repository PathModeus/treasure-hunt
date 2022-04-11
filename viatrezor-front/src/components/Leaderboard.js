import { useState } from "react";
import "../styles/Leaderboard.css";

function Leaderboard(props) {
  const listTeams = props.teamsList.map((team) => <TeamLine team={team} />);
  return (
    <div className="leaderboard">
      <div classname="leaderboard-head">
        <div>
          <h1 className="leaderboard-head-text">Leaderboard</h1>
        </div>
      </div>
      <div className="leaderboard-body-wrap">
        <div className="leaderboard-body">{listTeams}</div>
      </div>
    </div>
  );
}

function convertTime(time) {
  var sec = time % 60;
  var min_tot = Math.floor(time / 60);
  var min = min_tot % 60;
  var hours = Math.floor(min_tot / 60);
  var result = hours + ":" + min + ":" + sec;
  return result;
}

function TeamLine(props) {
  const [color, changeColor] = useState("green");
  function stplacouleur() {
    if (color === "green") {
      changeColor("red");
    } else {
      changeColor("green");
    }
  }
  return (
    <div
      onClick={stplacouleur}
      style={{ background: color }}
      className="team-line"
    >
      <div className="team-line-name">{props.team.name}</div>
      <div className="team-line-time">{convertTime(props.team.time)}</div>
      <div className="team-line-score">{props.team.score}pts</div>
      <StopButton name={props.team} />
    </div>
  );
}

function StopButton(props) {
  return <button class="team-line-pause">Pause</button>;
}

export default Leaderboard;
