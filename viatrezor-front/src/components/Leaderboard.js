import { useEffect, useState } from 'react';
import '../styles/Leaderboard.css'

function Leaderboard() {
  const [listTeams, setListTeams] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/team/all`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    }).then(async res => {
      setListTeams(await res.json());
    }).catch(e => console.log(e));
  }, [])

  return (
    <div className='leaderboard'>
      <div classname='leaderboard-head'>
        <div>
          <h1 className='leaderboard-head-text'>Leaderboard</h1>
        </div>
      </div>
      <div className='leaderboard-body-wrap'>
        <div className='leaderboard-body'>{listTeams.map((team, index) => <TeamLine key={index} team={team} />)}</div>
      </div>
    </div>
  )
}

function convertTime(time) {
  var sec = time % 60;
  var min_tot = Math.floor(time / 60);
  var min = min_tot % 60;
  var hours = Math.floor(min_tot / 60)
  var result = hours + ':' + min + ':' + sec;
  return (result)
}

function TeamLine(props) {
  return (
    <div className='team-line'>
      <div className='team-line-name team-line-element'>{props.team.team_name}</div>
      <div className='team-line-time team-line-element'>{convertTime(props.team.time)}</div>
      <div className='team-line-score team-line-element'>{props.team.points}pts</div>
    </div>
  )
}


export default Leaderboard